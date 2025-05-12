import { useRequest } from "ahooks";
import { getQuetionListService } from "../service/quetion";
import { useSearchParams } from "react-router-dom";
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_DEFAULT, LIST_PAGE_SIZE_PARAM_KEY, LIST_SEARCH_KEYWORDS } from "../const";

type OptionType = {
  isStar: boolean;
  isDeleted: boolean;
};

function useLoadQuestionListData(opt: Partial<OptionType>) {
  const { isStar, isDeleted } = opt;
  const [searchParams] = useSearchParams();
  const { loading, data, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_KEYWORDS) || "";
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE_DEFAULT;
      
      const data = await getQuetionListService({ keyword, isStar, isDeleted, page, pageSize });
      return data;
    },
    {
      refreshDeps: [searchParams],
    }
  );
  return { loading, data, error, refresh };
}

export default useLoadQuestionListData;
