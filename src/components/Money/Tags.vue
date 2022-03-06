<template>
  <div class="tags">
    <ol class="current">
      <li v-for="tag in tagsByType" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag) >= 0}"
          @click="toggle(tag)">
        <div>
          <Icon :name="tag.icon"/>
        </div>
        <span>{{ tag.name }}</span>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
import {Tag} from '@/store';

@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    }
  }
})
export default class Tags extends mixins(TagHelper) {
  @Prop() readonly type!: '-' | '+';

  created() {
    this.$store.commit('fetchTags');
  }
  get tagsByType() {
    return this.$store.state.tagList.filter((tag: Tag) => tag.type === this.type);
  }
  selectedTags: string[] = [];
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";

.tags {
  font-size: 12px;
  flex: 5;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  > ol {
    display: flex;
    flex-wrap: wrap;
    padding: 4px 0;

    ::-webkit-scrollbar {
      display: none;
    }

    > li {
      width: 20%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 4px 0;
      cursor: pointer;

      > div {
        width: 70%;
        height: 45px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        .icon {
          width: 32px;
          height: 32px;
        }
      }

      > span {
        margin-top: 3px;
      }

      &.selected {
        color: $mainColor;

        > div {
          background: #E8F1FF;

          .icon {
            fill: $mainColor;
          }
        }
      }
    }
  }
}
</style>