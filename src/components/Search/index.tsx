import React, { useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/filte/slice";

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 150),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.root}>
      <img
        className={styles.icon}
        src="/img/4781817_brows_browsing_find_search_seo_icon.png"
      />

      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="поиск пицца ... "
      />

      {value && (
        <img
          onClick={onClickClear}
          className={styles.clearIcon}
          src="/img/3669378_clear_ic_icon.png"
        />
      )}
    </div>
  );
};
