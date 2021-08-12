<template>
  <div
    class="re-input"
    :class="[
      inputSize ? 're-input--' + inputSize : '',
      {
        'is-disabled': inputDisabled,
        're-input-group': $slots.prepend || $slots.append,
        're-input-group--append': $slots.append,
        're-input-group--prepend': $slots.prepend,
        're-input--suffix': clearable || showPassword
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template>
      <!-- 前置元素 -->
      <div class="re-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        :tabindex="tabindex"
        class="re-input__inner"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        ref="input"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
      />
      <!-- 后置内容 -->
      <span class="re-input__suffix" v-if="isSuffixVisible">
        <span class="re-input__suffix-inner">
          <i v-if="showClear" class="re-input__icon re-icon_clear" @mousedown.prevent @click="clear"></i>
          <i
            v-if="showPwdVisible"
            class="re-input__icon"
            :class="{ 're-input__showPwd': this.passwordVisible, 're-input__hidePwd': !this.passwordVisible }"
            @click="handlePasswordVisible"
          ></i>
        </span>
      </span>
      <!-- 后置元素 -->
      <div class="re-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
  </div>
</template>

<script>
const isKorean = (text) => {
  const reg = /([(\uAC00-\uD7AF)|(\u3130-\u318F)])+/gi
  return reg.test(text)
}
export default {
  name: 'ReInput',
  componentName: 'ReInput',
  inheritAttrs: false,
  data() {
    return {
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false
    }
  },
  props: {
    value: [String, Number],
    size: String,
    disabled: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    /* 原生属性 */
    form: String,
    readonly: Boolean,
    tabindex: String,
    autocomplete: {
      type: String,
      default: 'off'
    }
  },
  computed: {
    isSuffixVisible() {
      return this.showClear || this.showPassword
    },
    inputSize() {
      return this.size || (this.$ELEMENT || {}).size
    },
    inputDisabled() {
      return this.disabled
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value)
    },
    showClear() {
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
      )
    },
    showPwdVisible() {
      return this.showPassword && !this.inputDisabled && !this.readonly && (!!this.nativeInputValue || this.focused)
    }
  },
  watch: {
    nativeInputValue() {
      this.setNativeInputValue()
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
    select() {
      this.$refs.input.select()
    },
    setNativeInputValue() {
      const input = this.$refs.input
      if (!input) return
      if (input.value === this.nativeInputValue) return
      input.value = this.nativeInputValue
    },
    handleBlur(event) {
      this.focused = false
      this.$emit('blur', event)
    },
    handleFocus(event) {
      this.focused = true
      this.$emit('focus', event)
    },
    handleCompositionStart() {
      this.isComposing = true
    },
    handleCompositionUpdate(event) {
      const text = event.target.value
      const lastCharacter = text[text.length - 1] || ''
      this.isComposing = !isKorean(lastCharacter)
    },
    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false
        this.handleInput(event)
      }
    },
    handleInput(event) {
      if (this.isComposing) return
      if (event.target.value === this.nativeInputValue) return
      this.$emit('input', event.target.value)
      this.$nextTick(this.setNativeInputValue)
    },
    handleChange(event) {
      this.$emit('change', event.target.value)
    },
    calcIconOffset(place) {
      let elList = [].slice.call(this.$el.querySelectorAll(`.re-input__${place}`) || [])
      if (!elList.length) return
      let el = null
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i]
          break
        }
      }
      if (!el) return
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      }

      const pendant = pendantMap[place]
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${
          this.$el.querySelector(`.re-input-group__${pendant}`).offsetWidth
        }px)`
      } else {
        el.removeAttribute('style')
      }
    },
    updateIconOffset() {
      this.calcIconOffset('prefix')
      this.calcIconOffset('suffix')
    },
    clear() {
      this.$emit('input', '')
      this.$emit('change', '')
      this.$emit('clear')
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible
      this.$nextTick(() => {
        this.focus()
      })
    }
  },
  created() {
    this.$on('inputSelect', this.select)
  },
  mounted() {
    this.setNativeInputValue()
    this.updateIconOffset()
  },
  updated() {
    this.$nextTick(this.updateIconOffset)
  }
}
</script>

<style lang="scss" scoped>
.re-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  user-select: none;

  .re-input__inner {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;

    &::placeholder {
      color: #c0c4cc;
    }
    &:hover {
      border-color: #c0c4cc;
    }
    &:focus {
      border-color: #409eff;
      outline: 0;
    }
  }

  .re-input__suffix {
    position: absolute;
    top: 0;
    right: 5px;
    text-align: center;
    height: 100%;
    color: #c0c4cc;
    transition: all 0.3s;
    pointer-events: none;
    user-select: none;
  }

  .re-input__suffix-inner {
    pointer-events: all;
  }

  .re-input__icon {
    height: 100%;
    width: 25px;
    text-align: center;
    transition: all 0.3s;
    line-height: 40px;
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

    &.re-icon_clear {
      &::after {
        content: '';
        display: inline-block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        background-image: url('../../assets/icons/clear.svg');
        background-size: contain;
        background-repeat: no-repeat;
        vertical-align: middle;
      }
    }

    &.re-input__showPwd {
      &::after {
        content: '';
        display: inline-block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        background-image: url('../../assets/icons/eye_close.svg');
        background-size: contain;
        background-repeat: no-repeat;
        vertical-align: middle;
      }
    }

    &.re-input__hidePwd {
      &::after {
        content: '';
        display: inline-block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        background-image: url('../../assets/icons/eye.svg');
        background-size: contain;
        background-repeat: no-repeat;
        vertical-align: middle;
      }
    }
  }
}

.re-input.is-disabled {
  .re-input__icon {
    cursor: not-allowed;
  }

  .re-input__inner {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }

  .re-input__inner::placeholder {
    color: #c0c4cc;
  }
}

.re-input::-webkit-scrollbar {
  z-index: 11;
  width: 6px;
}
.re-input::-webkit-scrollbar:horizontal {
  height: 6px;
}
.re-input::-webkit-scrollbar-thumb {
  border-radius: 5px;
  width: 6px;
  background: #b4bccc;
}
.re-input::-webkit-scrollbar-corner {
  background: #fff;
}
.re-input::-webkit-scrollbar-track {
  background: #fff;
}
.re-input::-webkit-scrollbar-track-piece {
  background: #fff;
  width: 6px;
}
/* size  */
.re-input--medium {
  font-size: 14px;
}
.re-input--medium .re-input__inner {
  height: 36px;
  line-height: 36px;
}
.re-input--medium .re-input__icon {
  line-height: 36px;
}
.re-input--small {
  font-size: 13px;
}
.re-input--small .re-input__inner {
  height: 32px;
  line-height: 32px;
}
.re-input--small .re-input__icon {
  line-height: 32px;
}
.re-input--mini {
  font-size: 12px;
}
.re-input--mini .re-input__inner {
  height: 28px;
  line-height: 28px;
}
.re-input--mini .re-input__icon {
  line-height: 28px;
}
</style>

<style lang="scss" scoped>
/* group  */
.re-input-group {
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  & > .re-input__inner {
    vertical-align: middle;
    display: table-cell;
  }
}
.re-input-group__append,
.re-input-group__prepend {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  display: table-cell;
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 20px;
  width: 1px;
  white-space: nowrap;

  &:focus {
    outline: 0;
  }
}

.re-input-group__prepend {
  border-right: 0;
}
.re-input-group__append {
  border-left: 0;
}

.re-input-group--prepend .re-input__inner,
.re-input-group__append {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.re-input-group--append .re-input__inner,
.re-input-group__prepend {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>