const Pagenaton = ({ totalPost, postPerPage, setCurrPage }) => {
  let page = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    page.push(i);
  }
  return (
    <div className="flex justify-center items-center p-2 mt-6">
      <div className="flex gap-4">
        {page.map((pa, indx) => (
          <button
            className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            key={indx}
            onClick={() => setCurrPage(pa)}
          >
            {pa}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Pagenaton;
