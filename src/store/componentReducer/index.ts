import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ComponentPropsType } from "../../components";
import { getNextSelectedId, insertNewComponent } from "./utils";
import { cloneDeep } from "lodash";
import { nanoid } from "nanoid";

export type ComponentInfoType = {
  fe_id: string; // 前端生成的id，服务端MongoDB默认自增主键是_id
  title: string;
  type: string; // 和后端一致
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentStateType = {
  selectedId: string;
  componentList: ComponentInfoType[];
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentStateType = {
  selectedId: "",
  componentList: [],
  copiedComponent: null,
};

export const componentSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    resetComponents: (
      state: ComponentStateType,
      action: PayloadAction<ComponentStateType>
    ) => {
      return action.payload;
    },
    changeSelectedId: (draft, action: PayloadAction<string>) => {
      draft.selectedId = action.payload;
    },
    addComponent: (draft, action: PayloadAction<ComponentInfoType>) => {
      const newComponent = action.payload;
      insertNewComponent(draft, newComponent);
    },
    changeComponentProps: (
      draft,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) => {
      const { fe_id, newProps } = action.payload;
      const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.props = {
          ...curComp.props,
          ...newProps,
        };
      }
    },
    removeSelectedComponent: (draft) => {
      const { selectedId: removeId, componentList } = draft;
      // 重新计算 selectedId
      draft.selectedId = getNextSelectedId(removeId, componentList);
      // 删除组件
      const index = componentList.findIndex((c) => c.fe_id === removeId);
      componentList.splice(index, 1);
    },
    changeComponentHidden: (
      draft,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) => {
      const { componentList = [] } = draft;
      const { fe_id, isHidden } = action.payload;
      // 重新计算 selectedId
      let newSelectedId = "";
      if (isHidden) {
        newSelectedId = getNextSelectedId(fe_id, componentList);
      } else {
        // 要显示,在后续图层中会用到
        newSelectedId = fe_id;
      }
      draft.selectedId = newSelectedId;
      const curComp = componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isHidden = isHidden;
      }
    },
    // 锁定/解锁
    toggleComponentLock: (draft, action: PayloadAction<{ fe_id: string }>) => {
      const { componentList = [] } = draft;
      const { fe_id } = action.payload;
      const curComp = componentList.find((c) => c.fe_id === fe_id);
      if (curComp) {
        curComp.isLocked = !curComp.isLocked;
      }
    },
    // 拷贝当前选中的组件
    copyComponent: (draft: ComponentStateType) => {
      const { selectedId , componentList = [] } = draft;
      const curComp = componentList.find((c) => c.fe_id === selectedId);
      if (curComp) {
        // 深拷贝
        draft.copiedComponent = cloneDeep(curComp);
      }
    },
    // 粘贴组件
    pasteComponent: (draft: ComponentStateType) => {
      const { copiedComponent} = draft;
      if(copiedComponent == null) return;
      // 修改fe_id
      copiedComponent.fe_id = nanoid();
      // 新增copiedComponent组件
      insertNewComponent(draft, copiedComponent);

    },
    // 选中上一个组件
    selectPrevComponent: (draft : ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
      if (selectedIndex < 0) return; // 未选中组件
      if (selectedIndex === 0) return; // 已经选中第一个，不能再上
      draft.selectedId = componentList[selectedIndex - 1].fe_id;
    },
    // 选中下一个组件
    selectNextComponent: (draft : ComponentStateType) => {
      const { selectedId, componentList } = draft;
      const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
      if (selectedIndex < 0) return; // 未选中组件
      if (selectedIndex + 1 === componentList.length) return; // 已经选中最后一个，不能再下
      draft.selectedId = componentList[selectedIndex + 1].fe_id;
    },
    // 修改标题组件
    changeComponentTitle: (draft: ComponentStateType, action: PayloadAction<{fe_id: string, title: string}>) => {
      const { fe_id, title } = action.payload;
      const component = draft.componentList.find((c) => c.fe_id === fe_id);
      if (component) {
        component.title = title;
      }
    },
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copyComponent,
  pasteComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
} = componentSlice.actions;
export default componentSlice.reducer;