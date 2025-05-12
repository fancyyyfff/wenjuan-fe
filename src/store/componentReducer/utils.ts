import { ComponentInfoType, ComponentStateType } from './index';

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
    const visbleComponentList = componentList.filter(c => !c.isHidden);
    const index = visbleComponentList.findIndex(c => c.fe_id === fe_id);
    // 1. 先排除一个组件都没有的情况，直接返回空
    if (index < 0) return '';
    // 2. 重新计算 selectedId
    let newSelectedId = '';
    const length = visbleComponentList.length;
    if (length <=1) {
        // 2.1只有一个组件，删除后就没有了
        newSelectedId = '';
    } else {
        // 2.2组件数>1 :
        // 2.2.1 删除的是最后一个组件,就选中上一个组件
        if (index + 1 === length) {
            newSelectedId = visbleComponentList[index - 1].fe_id;
        } else {
            // 2.2.2 删除的是中间组件,就选中下一个组件
            newSelectedId = visbleComponentList[index + 1].fe_id;
        }
    }
    return newSelectedId;
}

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: ComponentStateType, newComponent: ComponentInfoType) {
    const { selectedId, componentList } = draft;
  
      const index = componentList.findIndex((c) => c.fe_id === selectedId);
      if (index < 0) {
        componentList.push(newComponent);
      } else {
        componentList.splice(index + 1, 0, newComponent);
      }

      draft.selectedId = newComponent.fe_id;
}