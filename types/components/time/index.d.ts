/**
 * @file 动态表单
 * @author svon.me@gmail.com
 */
import { date } from "@eci/utils";
import { PropType } from "vue";
declare const _default: import("vue").DefineComponent<{
    value: {
        default: string;
        type: PropType<date.DateValue>;
    };
    date: {
        type: BooleanConstructor;
        required: false;
        default(): any;
    };
    format: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        default: string;
        type: PropType<date.DateValue>;
    };
    date: {
        type: BooleanConstructor;
        required: false;
        default(): any;
    };
    format: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    value: date.DateValue;
    date: boolean;
    format: string;
}>;
export default _default;
