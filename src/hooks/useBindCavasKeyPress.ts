import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { copyComponent, pasteComponent, removeSelectedComponent, selectNextComponent, selectPrevComponent } from "../store/componentReducer";
import { use } from "react";

/**
 * 判断activeElement是否合法
 */
function isActiveElementValid() {
    const activeElement = document.activeElement;
    if (activeElement === document.body) return true;
    return false;
}

function useBindCanvasKeyPress() {
    // 删除组件
    const dispatch = useDispatch();

    useKeyPress(["Backspace", "Delete"], () => {
        if(!isActiveElementValid()) return;
        dispatch(removeSelectedComponent());
    })
    // 复制组件
    useKeyPress(["ctrl.c", "Meta.c"], () => {
        if(!isActiveElementValid()) return;
        dispatch(copyComponent());
    })
    // 粘贴组件
    useKeyPress(["ctrl.v", "Meta.v"], () => {
        if(!isActiveElementValid()) return;
        dispatch(pasteComponent());
    })
    // 选中上一个
    useKeyPress('uparrow', () => {
        if(!isActiveElementValid()) return;
        dispatch(selectPrevComponent());
    })
    // 选中下一个
    useKeyPress('downarrow', () => {
        if(!isActiveElementValid()) return;
        dispatch(selectNextComponent());
    })
    // TODO: 往上/往下移动组件、撤销/重做

}

export default useBindCanvasKeyPress;