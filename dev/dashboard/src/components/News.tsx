import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const News: React.FC = () => {

  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setEditForm] = useState(false);
  const [isPopupDelete, setDeletePopup] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [news, setNews] = useState<any[]>([]);
  const [deleteNews, setDeleteNews] = useState<string | null>(null);
  const [editNews, setEditNews] = useState<string | null>(null);

  const [NewsImage, setImage] = useState<File | null>(null);
  const [NewsDate, setDate] = useState('');
  const [NewsTitle, setTitle] = useState('');
  const [NewsLink, setLink] = useState('');

  const [NewsImageEdit, setImageEdit] = useState<File | string>('');
  const [NewsDateEdit, setDateEdit] = useState('');
  const [NewsTitleEdit, setTitleEdit] = useState('');
  const [NewsLinkEdit, setLinkEdit] = useState('');

  useEffect(() => {
        fetch(`${API_BASE}/api/news/get`)
        .then((res) => res.json())
        .then((data) => setNews(data))
        .catch((err) => console.log(err));
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!NewsImage) {
      console.error("Image requise !");
      return;
    }

    const formData = new FormData();
    formData.append("image", NewsImage);
    formData.append("date", NewsDate);
    formData.append("title", NewsTitle);
    formData.append("link", NewsLink);

    try {
      const res = await fetch(`${API_BASE}/api/news/save`, {
        method: "POST",
        body: formData,
      });

      if(!res.ok) {
          throw new Error("Erreur lors de l'ajout de l'actualité");
        }

      const savedNews = await res.json();
      setNews((prev) => [...prev, savedNews]);
      setImage(null);
      setDate("");
      setTitle("");
      setLink("");
      setShowForm(false);

      console.log("Actualité ajoutée !");
    } catch (error) {
      console.error("Erreur fetch:", error);
    }
};

  const handleEditClick = (id: string) => {
    const selected = news.find(item => item._id === id);
    if(!selected) return;

    setEditNews(id);
    setImageEdit(selected.image);
    setDateEdit(selected.date);
    setTitleEdit(selected.title);
    setLinkEdit(selected.link);
    setEditForm(true);
  }

  const onEdit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    if (NewsImageEdit) formData.append("image", NewsImageEdit);
    formData.append("date", NewsDateEdit);
    formData.append("title", NewsTitleEdit);
    formData.append("link", NewsLinkEdit);

    try {
      const res = await fetch(`${API_BASE}/api/news/update/${editNews}`, {
        method: "PUT",
        body: formData,
      });

      if(!res.ok) {
        throw new Error('Erreur lors de la modification de l\'actualité');
      }
        const updatedNews = await res.json();
        const newNews = updatedNews.news ? updatedNews.news : updatedNews;
        setNews((prev) =>
          prev.map((item) => (item._id === editNews ? newNews : item))
        );

        setEditNews(null);
        setImageEdit('');
        setDateEdit('');
        setTitleEdit('');
        setLinkEdit('');
        setEditForm(false);
        console.log("Actualité modifié !")
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteNews(id);
    setDeletePopup(true);
  }

  const onDelete = async () => {
    if(!deleteNews) return;
    try {
      const res = await fetch(`${API_BASE}/api/news/delete/${deleteNews}`, {
        method: 'DELETE',
      });

      if(res.ok) {
        // setNews(news.filter(item => item._id !== deleteNews));
        setNews(prev => prev.filter(item => item._id !== deleteNews));
        setDeletePopup(false);
        setDeleteNews(null);
      } else {
        console.error("erreur lors de la suppression");
      }
    } catch (err) {
      console.error(err);
    }
  }; 

  return (
    <section>
        {/* FORMULAIRE D'AJOUT */}
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-extrabold ">Section Actualité</h1>
            <button
            onClick={() => setShowForm(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg transition-all duration-200 font-semibold inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Ajouter
            </button>
        </div>
        {showForm && (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ajout d'une nouvelle actualité</h3>
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image
                </label>
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          { NewsImage ? (
                            <>
                              <img src={URL.createObjectURL(NewsImage)} alt="Preview" className="w-40 h-40 object-cover rounded-lg mb-4" />
                              <p className="text-sm text-gray-500 dark:text-gray-400">{NewsImage.name}</p>
                            </>
                          ) : (
                            <>
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </>
                          )}
                        </div>
                        <input onChange={(e) => {if (e.target.files && e.target.files[0]) { setImage(e.target.files[0]);}}}id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div> 
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <input
                    value={NewsImage}
                    onChange={(e) => setImage(e.target.value)}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    value={NewsDate}
                    onChange={(e) => setDate(e.target.value)}
                    type="text"
                    required
                    // value={formData.name}
                    // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre
                  </label>
                  <input
                    value={NewsTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    // value={formData.location}
                    // onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lien
                </label>
                <input
                    value={NewsLink}
                    onChange={(e) => setLink(e.target.value)}
                    type="text"
                    // value={formData.location}
                    // onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                  // disabled={isSubmitting}
                //   className={`px-6 py-2 rounded-lg transition-colors duration-200 font-medium ${
                //     isSubmitting 
                //       ? 'bg-gray-400 cursor-not-allowed' 
                //       : 'bg-orange-600 text-white hover:bg-orange-700'
                //   }`}
                >
                  {/* {isSubmitting ? 'Envoi en cours...' : 'Ajouter'} */}
                  Ajouter
                </button>
                <button
                  type="button"
                //   disabled={isSubmitting}
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* AFFICHAGE LISTE */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Date
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Titre
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Lien
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>
                        <th scope="col" className="px-6 py-3">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((item) => (
                        <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                          <th scope="col" className="px-16 py-3">
                            <img src={`${API_BASE}${item.image}`} alt={item.title} className="w-12 h-12 object-cover"/>
                          </th>
                          <td className="px-6 py-4">
                            {item.date}
                          </td>
                          <td className="px-6 py-4">
                            {item.title}
                          </td>
                          <td className="px-6 py-4">
                            {item.link}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleEditClick(item._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDeleteClick(item._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                          </td>    
                        </tr> 
                    ))}                        
                </tbody>
            </table>

            {showEditForm && (
              <div className="overflow-y-auto overflow-x-hidden fixed flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Modifier l'Actualité
                            </h3>
                            <button onClick={() => setEditForm(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={onEdit} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                                    {NewsImageEdit && typeof NewsImageEdit === "string" && (
                                      <img
                                        src={`${API_BASE}${NewsImageEdit}`}
                                        alt="Image actuelle"
                                        className="w-32 h-32 object-cover rounded-lg mb-3"
                                      />
                                    )}
                                    {/* <input value={NewsImageEdit} onChange={(e) => setImageEdit(e.target.value)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"></input> */}
                                    <input
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                          setImageEdit(e.target.files[0]);
                                        }
                                      }}
                                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                      id="file_input"
                                      type="file"
                                    ></input>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                    <input value={NewsDateEdit} onChange={(e) => setDateEdit(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required></input>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
                                    <input value={NewsTitleEdit} onChange={(e) => setTitleEdit(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required></input>
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lien</label>
                                    <input value={NewsLinkEdit} onChange={(e) => setLinkEdit(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required></input>
                                </div>
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                                Modifier
                            </button>
                        </form>
                    </div>
                </div>
            </div> 
            )}

            {isPopupDelete && ( 
              <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <button onClick={() => setDeletePopup(false)} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Etes-vous sûr de vouloir supprimer cette actualité</h3>
                            <button onClick={onDelete} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Supprimer
                            </button>
                            <button onClick={() => setDeletePopup(false)} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Annuler</button>
                        </div>
                    </div>
                </div>
              </div>
            )}
        </div>

        {/* <form className="max-w-sm mx-auto">
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
        </div>
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre</label>
            <input className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
        </div>
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lien</label>
            <input className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ajouter</button>
        </form> */}
    </section>
  )
}

export default News