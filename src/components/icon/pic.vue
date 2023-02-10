<script setup lang="ts">
/**
 * @file 国旗图标
 * @author svon.me@gmail.com
 */

defineProps({
  name: {
    required: true,
    type: [String, Number]
  },
});
const countryPic = function(value: string | number) {
  const name = String(value).replace(/^(pic-{0,})?(\d+)(\.[a-z]+)?$/ig, "$2");
  const path = "https://crm.eciol.com/assets/images/country";
  if (/\.[a-z]+$/i.test(name)) {
    return `${path}/${name}`;
  }
  return `${path}/${name}.gif`;
};

const onError = (e: Event) => {
  if (e.target) {
    const img = e.target as HTMLImageElement;
    img.src = countryPic(0);
  }
}

const style = {
  width: "var(--eci-icon-size)",
  maxHeight: "var(--eci-icon-size)"
};
</script>

<template>
  <span>
    <img :style="style" :src="countryPic(name)" @error="onError"/>
  </span>
</template>