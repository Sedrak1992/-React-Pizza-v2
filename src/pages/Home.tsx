import React, { useRef } from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Categories, Sort, PizzaBlock, Skeleton } from "../components";
import { Pagination } from "../components/Pagination";
import { sortList } from "../components/Sort";

import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filte/selectors";
import { selectPizzaData } from "../redux/pizza/selectors";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filte/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { SearchPizzaParams } from "../redux/pizza/types";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? String(categoryId) : "";
    const search = searchValue;

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    // if (isMounted.current) {
    //   const params = {
    //     categoryId: categoryId > 0 ? categoryId : null,
    //     sortProperty: sort.sortProperty,
    //     currentPage,
    //   };

    //   const queryString = qs.stringify(params, { skipNulls: true });

    //   navigate(`/?${queryString}`);
    // }

    // const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
    // const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy);
    // dispatch(
    //   setFilters({
    //     searchValue: params.search,
    //     categoryId: Number(params.category),
    //     currentPage: Number(params.currentPage),
    //     sort: sortObj || sortList[0],
    //   }),
    // );

    getPizzas();
    // isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //   }
  //   isMounted.current = true;
  // }, []);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h1>😕</h1>
          <h2>произошла ошибка</h2>
          <p>Не удалось получить пиццу</p>{" "}
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
