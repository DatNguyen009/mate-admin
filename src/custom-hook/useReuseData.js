import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { createUrlParams } from "helpers/parseUrl";

function useReuseData(fetch, item, callback, isUseParams) {
  const data = useSelector(state => state[item]);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (!data?.fetched) {
      const res = await dispatch(fetch());
      if (callback) {
        callback(res.payload);
      }
    }
  }, []);

  const fetchWithParams = params => {
    if (!params) {
      dispatch(fetch());
      return;
    }
    const search = createUrlParams(params);
    dispatch(fetch(search));
  };

  if (isUseParams) {
    return { data, fetchWithParams };
  }

  return data;
}

useReuseData.propTypes = {
  fetch: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
};

export default useReuseData;
