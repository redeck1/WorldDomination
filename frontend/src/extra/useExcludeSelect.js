import { useSelector } from "react-redux";

export default function useExcludeSelect(countryName) {
  return useSelector((state) => state.countries.items.filter((item) => item.name !== countryName));
}
