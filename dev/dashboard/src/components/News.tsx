import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const News: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setEditForm] = useState(false);
  const [isPopupDelete, setDeletePopup] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [news, setNews] = useState<any[]>([]);
  const [deleteNews, setDeleteNews] = useState<string | null>(null);
  const [editNews, setEditNews] = useState<string | null>(null);

  const [NewsImage, setImage] = useState<File | null>(null);
  const [NewsDate, setDate] = useState("");
  const [NewsTitle, setTitle] = useState("");
  const [NewsLink, setLink] = useState("");
  const [NewsDescription, setDescription] = useState("");

  const [NewsImageEdit, setImageEdit] = useState<File | string>("");
  const [NewsDateEdit, setDateEdit] = useState("");
  const [NewsTitleEdit, setTitleEdit] = useState("");
  const [NewsLinkEdit, setLinkEdit] = useState("");
  const [NewsDescriptionEdit, setDescriptionEdit] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/news/get`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.log(err));
  }, []);

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
    formData.append("description", NewsDescription);

    try {
      const res = await fetch(`${API_BASE}/api/news/save`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'ajout de l'actualité");
      }

      const savedNews = await res.json();
      setNews((prev) => [...prev, savedNews]);
      setImage(null);
      setDate("");
      setTitle("");
      setLink("");
      setDescription("");
      setShowForm(false);
    } catch (error) {
      console.error("Erreur fetch:", error);
    }
  };

  const handleEditClick = (id: string) => {
    const selected = news.find((item) => item._id === id);
    if (!selected) return;

    setSelectedRadio(selected.description ? "description" : "link");
    setEditNews(id);
    setImageEdit(selected.image);
    setDateEdit(selected.date);
    setTitleEdit(selected.title);
    setLinkEdit(selected.link);
    setDescriptionEdit(selected.description);
    setEditForm(true);
  };

  const onEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    if (NewsImageEdit) formData.append("image", NewsImageEdit);
    formData.append("date", NewsDateEdit);
    formData.append("title", NewsTitleEdit);
    formData.append("link", NewsLinkEdit);
    formData.append("description", NewsDescriptionEdit);

    try {
      const res = await fetch(`${API_BASE}/api/news/update/${editNews}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Erreur lors de la modification");
      }

      const updatedNews = await res.json();
      const newNews = updatedNews.news ? updatedNews.news : updatedNews;
      setNews((prev) =>
        prev.map((item) => (item._id === editNews ? newNews : item))
      );

      setEditNews(null);
      setImageEdit("");
      setDateEdit("");
      setTitleEdit("");
      setLinkEdit("");
      setDescriptionEdit("");
      setEditForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteNews(id);
    setDeletePopup(true);
  };

  const onDelete = async () => {
    if (!deleteNews) return;
    try {
      const res = await fetch(`${API_BASE}/api/news/delete/${deleteNews}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setNews((prev) => prev.filter((item) => item._id !== deleteNews));
        setDeletePopup(false);
        setDeleteNews(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRadioChange = (value: string) => {
  setSelectedRadio(value);

  if (value === "description") {
    setLink("");  
  } else if (value === "link") {
    setDescription(""); 
  }
};

  // ---------------------------
  // UI STARTS HERE
  // ---------------------------

  return (
    <section className="">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-extrabold">Section Actualité</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg transition-all duration-200 font-semibold inline-flex items-center shadow-lg hover:shadow-xl hover:scale-105"
        >
          + Ajouter
        </button>
      </div>

      {/* SOUS-TITRE */}
      <div>
        <h2 className="text-2xl font-bold text-yellow-500">Actualités</h2>
        <p className="text-gray-600 mb-4">Gérez les actualités publiées sur le site</p>
      </div>

      {/* FORMULAIRE D'AJOUT */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-500">
              Ajouter une actualité
            </h3>

            <form onSubmit={onSubmit} className="space-y-6">

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block text-sm font-semibold mb-2">Image</label>

                <label className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {NewsImage ? (
                      <>
                        <img
                          src={URL.createObjectURL(NewsImage)}
                          className="w-40 h-40 object-cover rounded-xl mb-4"
                        />
                        <p className="text-sm text-gray-600">{NewsImage.name}</p>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-10 h-10 text-gray-400 mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeWidth={2} d="M3 16l6-6 4 4 8-8" />
                        </svg>
                        <p className="text-gray-600 text-sm">Cliquez pour upload</p>
                      </>
                    )}
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files && setImage(e.target.files[0])
                    }
                  />
                </label>
              </div>

              {/* DATE + TITRE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    required
                    value={NewsDate}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={NewsTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500"
                  />
                </div>
              </div>

              {/* RADIO TYPE */}
              <div className="flex gap-6">
                <label
                  className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer ${selectedRadio === "description"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-200"
                    }`}
                >
                  <input
                    type="radio"
                    checked={selectedRadio === "description"}
                    onChange={() => handleRadioChange("description")}
                  />
                  Description
                </label>

                <label
                  className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl cursor-pointer ${selectedRadio === "link"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-200"
                    }`}
                >
                  <input
                    type="radio"
                    checked={selectedRadio === "link"}
                    onChange={() => handleRadioChange("link")}
                  />
                  Lien
                </label>
              </div>

              {/* DESCRIPTION */}
              {selectedRadio === "description" && (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    value={NewsDescription}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500"
                  />
                </div>
              )}

              {/* LIEN */}
              {selectedRadio === "link" && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Lien</label>
                  <input
                    type="text"
                    value={NewsLink}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-500"
                  />
                </div>
              )}

              {/* BUTTONS */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                >
                  Ajouter
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
                >
                  Annuler
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* TABLEAU LISTE */}
      <div className="border-t border-gray-200 pt-6"></div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-yellow-50 border-b-2 border-yellow-200">
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Image
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Titre
              </th>
              <th className="px-6 py-4 text-left font-semibold text-gray-700">
                Type
              </th>
              
              <th className="px-10 py-4 text-right font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {news.map((item) => (
              <tr
                key={item._id}
                className="border-b border-gray-100 hover:bg-yellow-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <img
                    src={`${API_BASE}${item.image}`}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                </td>

                <td className="px-6 py-4">{item.date}</td>

                <td className="px-6 py-4">{item.title}</td>

                <td className="px-6 py-4 font-medium">
                  {item.description ? (
                    <span className="text-blue-700">Description</span>
                  ) : (
                    <span className="text-green-700">Lien</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleEditClick(item._id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-sm font-medium"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALE EDIT */}
      {showEditForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="relative bg-white rounded-xl shadow-2xl">

              {/* HEADER */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t-xl">
                <h3 className="text-lg font-semibold text-gray-900">
                  Modifier l'Actualité
                </h3>
                <button
                  onClick={() => setEditForm(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              {/* FORM */}
              <form onSubmit={onEdit} className="p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">

                  {/* IMAGE */}
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Image
                    </label>
                    {NewsImageEdit && typeof NewsImageEdit === "string" && (
                      <img
                        src={`${API_BASE}${NewsImageEdit}`}
                        alt="Image actuelle"
                        className="w-32 h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    <input
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImageEdit(e.target.files[0]);
                        }
                      }}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                      id="file_input"
                      type="file"
                    />
                  </div>

                  {/* DATE */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Date
                    </label>
                    <input
                      value={NewsDateEdit}
                      onChange={(e) => setDateEdit(e.target.value)}
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-primary-600 focus:border-primary-600"
                      required
                    />
                  </div>

                  {/* TITRE */}
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Titre
                    </label>
                    <input
                      value={NewsTitleEdit}
                      onChange={(e) => setTitleEdit(e.target.value)}
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-primary-600 focus:border-primary-600"
                      required
                    />
                  </div>

                  {/* LIEN – même logique que TON code */}
                  {selectedRadio === "link" && (
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Lien
                      </label>
                      <input
                        value={NewsLinkEdit}
                        onChange={(e) => setLinkEdit(e.target.value)}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  )}

                  {/* DESCRIPTION – même logique que TON code */}
                  {selectedRadio === "description" && (
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Description
                      </label>
                      <textarea
                        value={NewsDescriptionEdit}
                        onChange={(e) => setDescriptionEdit(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                  </svg>
                  Modifier
                </button>
              </form>
            </div>
          </div>
        </div>
      )}


      {/* POPUP SUPPRESSION */}
      {isPopupDelete && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-600 text-center">
              Supprimer l’actualité ?
            </h2>

            <p className="mb-6 text-center text-gray-700">
              Cette action est irréversible.
            </p>

            <div className="flex gap-4">
              <button
                onClick={onDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Supprimer
              </button>

              <button
                onClick={() => setDeletePopup(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default News;
