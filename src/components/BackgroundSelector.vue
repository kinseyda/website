<template>
  <div class="menu menu-vertical cursor-default">
    <div class="menu-title">
      <h1>Background Options</h1>
    </div>
    <div class="menu-item">
      <label class="label">
        <input type="checkbox" class="toggle" v-model="isBackgroundEnabled" />
        Enable Background Animation
      </label>
    </div>
    <div class="menu-item">
      <label class="label">
        <input type="checkbox" class="toggle" v-model="showPoints" />
        Show Points
      </label>
    </div>
    <div class="menu-item">
      <label class="label">
        <input type="checkbox" class="toggle" v-model="showGuideWave" />
        Show Guide Wave
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { useVModel } from "@nanostores/vue";
import { backgroundStore } from "./BackgroundStore";

export default {
  components: {},
  emits: {},
  data() {
    return {};
  },
  setup() {
    const isBackgroundEnabled = useVModel(
      backgroundStore,
      "isBackgroundEnabled"
    );
    const showPoints = useVModel(backgroundStore, "showPoints");
    const showGuideWave = useVModel(backgroundStore, "showGuideWave");
    return {
      isBackgroundEnabled: isBackgroundEnabled,
      showPoints: showPoints,
      showGuideWave: showGuideWave,
    };
  },
};
</script>

<style scoped></style>
