<template>
  <div class="tags">
    <ol>
      <li v-for="tag in tagsByType" :key="tag.id"
          :class="{selected: id !== '' && id !== '0' && tag === selectedTag}"
          @click="selectTag(tag)">
        <div>
          <Icon :name="tag.icon"/>
        </div>
        <span>{{ tag.name }}</span>
      </li>

      <router-link  v-if="lastOne[0]==='settings'" :to="`/setTag/${type}`">
        <div>
          <Icon :name="lastOne[0]"/>
        </div>
        <span>{{ lastOne[1] }}</span>
      </router-link>

      <router-link  v-if="lastOne[0]==='tianjia'" :to="`/addTag/${type}`">
        <div>
          <Icon :name="lastOne[0]"/>
        </div>
        <span>{{ lastOne[1] }}</span>
      </router-link>
    </ol>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
import {Tag} from '@/store';

@Component
export default class Tags extends mixins(TagHelper) {
  @Prop() readonly type!: '-' | '+';
  @Prop() readonly lastOne!: [];
  @Prop() readonly id?: string;
  @Prop() readonly icon?: string;
  @Prop() readonly name?: string;

  created() {
    this.$store.commit('fetchTags');
  }

  get tagsByType() {
    return this.$store.state.tagList.filter((tag: Tag) => tag.type === this.type);
  }

  selectedTag = {id: '', name: '', icon: '', type: '-'};
  selectTag(tag: Tag) {
    if(tag !== this.selectedTag) {
      this.selectedTag = tag
    }
    this.$emit('update:id', this.selectedTag.id);
    this.$emit('update:icon', this.selectedTag.icon);
    this.$emit('update:name', this.selectedTag.name);
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/style/helper";

.tags {
  align-items: center;
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

    > a {
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
    }
  }
}
</style>