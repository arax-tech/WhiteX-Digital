<script setup>
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: Object,
    required: true,
  },
  codeLanguage: {
    type: String,
    required: false,
    default: 'markup',
  },
  noPadding: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const preferredCodeLanguage = useCookie('preferredCodeLanguage', {
  default: () => 'ts',
  maxAge: COOKIE_MAX_AGE_1_YEAR,
})

const isCodeShown = ref(false)
const { copy, copied } = useClipboard({ source: computed(() => props.code[preferredCodeLanguage.value]) })
</script>

<template>
  <VCard class="pb-5">
    <slot />
  </VCard>
</template>

<style lang="scss">
@use "@styles/variables/_vuetify.scss";

:not(pre)>code[class*="language-"],
pre[class*="language-"] {
  border-radius: vuetify.$card-border-radius;
}

.app-card-code-copy-icon {
  inset-block-start: 1.2em;
  inset-inline-end: 0.8em;
}
</style>
