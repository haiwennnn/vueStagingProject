<template>
  <div class="fj-wave">
    <svg viewBox="0 0 750 73">
      <path id="Path-2"
        class="cls-1"
        d="M0,53.89Q147.2,13,238,13c96.24,0,187.59,60,241,60S639,2,750,2V0H0Z" />
      <path id="Path-3"
        class="cls-1"
        d="M0,21.06C28.36,22.56,164.19,51,208,51c45,0,141.41-18,180-18S495,51,570,51,678,17,750,17V0H0Z" />
      <path id="Path-4"
        class="cls-1"
        d="M0,17a141.87,141.87,0,0,1,44-7c36,0,241,48,315,48S481,15,586,15A580.61,580.61,0,0,1,750,38.75V0H0Z" />
      <path id="Combined-Shape"
        class="cls-2"
        d="M0,0H750V2c-34.64,0-68.86,6.92-101.16,16.43A575.33,575.33,0,0,0,586,15c-57.91,0-98.48,13.08-135.64,24.81C425.49,36.15,404.14,33,388,33c-9,0-21.08,1-34.94,2.47C317.13,23.36,278,13,238,13q-46.11,0-106.78,10.56C90,15.9,56.62,10,44,10A140,140,0,0,0,0,17Z" />
    </svg>
  </div>
</template>
<script>
  export default {
    name: 'z-wave'
  }
</script>
<style lang="less" scoped>
  .fj-wave {
    margin-top: -1px;
    svg {
      display: inline-block;
    }
  }
  svg {
    height: 100%;
  }
  .cls-1,
  .cls-2 {
    fill: #f9ca1a;
  }
  .cls-1 {
    opacity: 0.3;
    isolation: isolate;
  }
</style>