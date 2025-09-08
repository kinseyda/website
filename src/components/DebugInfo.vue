<template>
  <div v-if="debugOptions.debugMode">
    <div>Debug Mode is ON</div>
    <div>
      <table class="table-auto">
        <tbody>
          <tr v-for="(value, key) in astroInfo" :key="key">
            <td class="pr-2 font-bold">{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore, useVModel } from "@nanostores/vue";
import { getDaisyUIColor } from "../utils/StyleUtils";
import { debugOptions } from "./DebugStore";

export default {
  components: {},
  props: {
    astroInfo: {
      type: Object as () => Record<string, any>,
      required: true,
    },
  },
  emits: {},
  data() {
    return {};
  },
  setup() {
    const $debugOptions = useStore(debugOptions);
    return {
      debugOptions: $debugOptions,
    };
  },
};
</script>

<style scoped></style>
