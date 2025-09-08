<template>
  <div class="menu">
    <div class="menu-title">
      <h1>Debug Options</h1>
    </div>
    <div class="menu-item">
      <label class="label">
        <input type="checkbox" class="toggle" v-model="isDebugMode" />
        Debug mode
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore, useVModel } from "@nanostores/vue";
import { getDaisyUIColor } from "../utils/StyleUtils";
import { debugOptions } from "./DebugStore";

export default {
  components: {},
  emits: {},
  data() {
    return {};
  },
  setup() {
    const isDebugMode = useVModel(debugOptions, "debugMode");
    return {
      isDebugMode: isDebugMode,
    };
  },
};
</script>

<style scoped></style>
