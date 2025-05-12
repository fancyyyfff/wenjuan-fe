import React, {FC} from "react";
import  useGetComponentInfo  from "../../../hooks/useGetComponentInfo";
import { ComponentPropsType, getComponentConfByType } from "../../../components";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../store/componentReducer";

const Non: FC = () => {
    return <div style={{textAlign: 'center'}}>未找到属性</div>
}

const ComponentProp: FC = () => {
    const dispatch = useDispatch();
    const {selectedComponent} = useGetComponentInfo();
    if (selectedComponent == null) return <Non/>
    if (selectedComponent == null) return <Non/>
    const {type, props, isLocked, isHidden} = selectedComponent;
    const componentConf = getComponentConfByType(type);
    if (componentConf == null) return <Non/>
    const {PropComponent} = componentConf;
    
    function changeProps(newProps: ComponentPropsType) {
        if(selectedComponent == null) return
        const {fe_id} = selectedComponent;
        dispatch(changeComponentProps({fe_id, newProps}));
    }
    return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden}/>
}
export default ComponentProp  