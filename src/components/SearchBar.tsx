import { memo, FormEvent, Dispatch, SetStateAction } from "react";
import { SearchParams } from "@/types";
import CustomSelect from "./CustomSelect";
import { InputWithReset } from "./InputWithReset";

interface SearchBarProps {
  onSearch: (e: FormEvent) => void;
  arrayLocations: string[];
  params: SearchParams;
  setParams: Dispatch<SetStateAction<SearchParams>>;
  resetFilter: (filter: keyof SearchParams) => void;
  resetAllFilters: () => void;
  fetchWhithLocation: (location: string) => void;
}

const SearchBar = ({
  onSearch,
  arrayLocations,
  params,
  setParams,
  resetFilter,
  resetAllFilters,
  fetchWhithLocation,
}: SearchBarProps) => {
  return (
    <form
      onSubmit={onSearch}
      className="flex flex-col gap-2 p-6 bg-gray-200 rounded-lg shadow-md m-4"
    >
      <InputWithReset
        value={params.search}
        onChange={(e) => setParams({ ...params, search: e.target.value })}
        placeholder="Що шукаєш?"
        resetFilter={() => resetFilter("search")}
      />

      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-4 flex-grow flex-shrink">
          <InputWithReset
            type="number"
            value={params.minPrice}
            onChange={(e) => setParams({ ...params, minPrice: e.target.value })}
            placeholder="Від"
            resetFilter={() => resetFilter("minPrice")}
          />

          <InputWithReset
            type="number"
            value={params.maxPrice}
            onChange={(e) => setParams({ ...params, maxPrice: e.target.value })}
            placeholder="До"
            resetFilter={() => resetFilter("maxPrice")}
          />
        </div>
        <CustomSelect
          value={params.location}
          onChange={(location) => fetchWhithLocation(location)}
          options={arrayLocations}
          placeholder="Вся Україна"
          resetFilter={() => resetFilter("location")}
        />
      </div>

      <button
        type="button"
        className="px-2 py-1 text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition shadow-md text-sm ml-auto"
        onClick={resetAllFilters}
      >
        Скинути фільтри
      </button>
      <button
        type="submit"
        className="px-6 py-2 font-semibold text-white bg-turquoise rounded-lg hover:bg-turquoise-dark focus:ring-2 focus:ring-offset-2 focus:ring-turquoise-dark transition shadow-md"
      >
        Шукати
      </button>
    </form>
  );
};

export default memo(SearchBar);
