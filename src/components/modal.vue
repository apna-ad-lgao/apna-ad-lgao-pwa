<template>
  <main :data-open-state="openState" class="modal-wrapper">
    <input :id="name" :ref="name" v-model="isOpen" class="absolute invisible modal-open-toggle" type="checkbox">
    <transition name="modal-anim">
      <section
        v-show="isOpen"
        :class="{ 'modal-active' : isOpen }"
        class="fixed flex flex-col full-height full-width justify-end sm:justify-center modal-cont inset-0 overflow-y-scroll z-20"
        role="navigation"
        aria-label="Global Modal"
      >
        <label :for="name" class="bg-black fixed full-height full-width modal-backdrop modal-cont opacity-50 inset-0" />

        <transition name="modal-content-anim">
          <section
            v-if="isOpen"
            :class="modalContentContHeight"
            class="bg-white modal-content-cont overflow-y-auto relative rounded-t-lg md:rounded-lg w-full sm:w-2/3 mx-auto"
          >
            <label v-if="showCloseBtn" :for="name" class="absolute fa-times fas right-0 top-0 px-4 py-3 text-gray-500" aria-label="Close" />
            <slot>
              <h1 class="my-8">
                modal window
              </h1>
            </slot>
          </section>
        </transition>
      </section>
    </transition>
  </main>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    modalContentContHeight: {
      type: String,
      required: true,
    },
    openModal: {
      type: Boolean,
      default: false,
    },
    showCloseBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    openState() {
      this.$nextTick(() => {
        if (this.menuOpened) {
          document.body.style.overflow = 'hidden';
          document.body.style.height = `${window.innerHeight}px`;
        } else {
          document.body.style.overflow = '';
          document.body.style.height = '';
        }
      });
      return this.isOpen;
    },
  },
  watch: {
    openModal(val) {
      this.isOpen = val;
    },
    isOpen(val) {
      this.$emit('modalOpenEvent', val);
    },
  },
  mounted() {
    this.isOpen = this.openModal;
  },
};
</script>

<style scoped>
.modal-open-toggle {
  left: -9999px;
}

.modal-content-cont {
  max-height: calc(100% - 85px);
}

.modal-anim-enter-active {
  animation: fade 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-anim-leave-active {
  animation: fade 0.15s ease-out reverse;
  animation-delay: 0.2s;
}

.modal-backdrop {
  backdrop-filter: saturate(180%) blur(20px);
}

.modal-content-anim-enter-active {
  animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-content-anim-leave-active {
  animation: slide-in 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse;
}
@keyframes slide-in {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
