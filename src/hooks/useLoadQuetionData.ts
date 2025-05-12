import { useParams } from "react-router-dom";
import { getQuetionService } from "../service/quetion";
import { useRequest } from "ahooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetComponents } from "../store/componentReducer";
import { resetPageInfo } from "../store/PageInfoReducer";

function useLoadQuetionData() {
  const { id = "" } = useParams();
  const dispatch = useDispatch();
  const {loading, data, error, run} = useRequest(async (id: string) => {
    if(!id) throw new Error('没有参数id，无法获取数据');
    const data = await getQuetionService(id);
    return data;
  }, {
    manual: true,
  })
//   根据data变化，重设store
useEffect(() => {
    if(!data) return;
    const {title = '', desc = '', js = '', css = '', isPublished = false, componentList = []} = data;
    let selectedId = '';
    if(componentList.length > 0) {
      selectedId = componentList[0].fe_id;
    }
    console.log('resetComponents',selectedId);
    dispatch(resetComponents({componentList, selectedId, copiedComponent: null}));
    // 存储页面信息
    dispatch(resetPageInfo({title, desc, js, css, isPublished}));
    
}, [data])

//   根据id变化获取数据
  useEffect(() => {
    run(id);
  },[id])

  return {loading, error};
}
export default useLoadQuetionData;
