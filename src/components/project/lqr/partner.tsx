/**
 * @file Add Lqr (Partner)
 * @author svon.me@gmail.com
 */

import { form } from "@ue/form"
import { partnerItems } from "./util"
import type { FormOptionValue, FormItemData } from "@ue/form/types/props";

export const AddPartner = function() {
  const items: FormOptionValue = [
    {
      component: (<div>
        <p>感谢您抽出宝贵时间填写本质量评估表。本评估表旨在了解 QA 和审校人员对议员译文质量的反馈意见。您的反馈将帮助我们在客观真实评估议员能力和表现的同时，发现并解决潜在的质量问题。</p>
        <p>请您客观填写以下评估表。</p>
      </div>)
    },
  ];
  form(items.concat(partnerItems()), {
    title: "Add LQR"
  });
}

//   <div>
//     <p></p>
//     <p>请您客观填写以下评估表。</p>
//     <div class="border border-solid border-gray-300 p-4 rounded-sm">
//       <UeForm :items="partnerItems" :buttons="false"></UeForm>
//     </div>
//   </div>
// </template>
