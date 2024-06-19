import { CiSearch } from "react-icons/ci";

export default function Hero({ query, setQuery, onSearchDocumentation }) {
  function onSubmit(event) {
    event.preventDefault();
    onSearchDocumentation();
  }

  return (
    <section className="flex flex-col items-center gap-4 justify-center py-12 px-4 w-full bg-teal-500">
      <h2 className="text-3xl leading-none font-bold text-gray-50 md:text-text-[2.5rem]">
        Documentation
      </h2>
      <p className="text-gray-200 text-md text-center md:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quia.
      </p>
      <form
        onSubmit={onSubmit}
        className="flex items-center w-full max-w-[36rem] px-6 py-3 rounded-3xl bg-gray-50 shadow-lg"
      >
        <input
          name="search"
          className="w-full bg-inherit focus:outline-none placeholder:text-gray-500 placeholder:text-sm"
          type="text"
          value={query}
          placeholder="Search the docs..."
          onChange={(e) => setQuery(e.target.value)}
          onClick={(e) => e.target.select()}
        />
        <button type="submit" className="text-xl">
          <CiSearch />
        </button>
      </form>
    </section>
  );
}
