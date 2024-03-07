"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetState = void 0;
const react_1 = require("react");
function useGetState(startingValue) {
    const [state, setState] = (0, react_1.useState)(startingValue);
    const stateRef = (0, react_1.useRef)(startingValue);
    const getState = () => {
        return stateRef.current;
    };
    const setStateInterceptor = (newState) => {
        if (typeof newState === "function") {
            stateRef.current = newState(stateRef.current);
            setState(stateRef.current);
        }
        else {
            stateRef.current = newState;
            setState(newState);
        }
    };
    return [state, setStateInterceptor, getState];
}
exports.useGetState = useGetState;
exports.default = useGetState;
//# sourceMappingURL=index.js.map