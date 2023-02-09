/**
 * @file 超链接
 * @author svon.me@gmail.com
 */
import { PropType } from "vue";
import type { RouteLocationRaw } from "vue-router";
declare const _default: import("vue").DefineComponent<{
    to: {
        required: false;
        default: string;
        type: PropType<RouteLocationRaw>;
    };
    tag: {
        type: StringConstructor;
        default: string;
        required: false;
    };
    target: {
        type: StringConstructor;
        default: string;
        required: false;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    to: {
        required: false;
        default: string;
        type: PropType<RouteLocationRaw>;
    };
    tag: {
        type: StringConstructor;
        default: string;
        required: false;
    };
    target: {
        type: StringConstructor;
        default: string;
        required: false;
    };
}>>, {
    target: string;
    tag: string;
    to: string;
}>;
export default _default;
