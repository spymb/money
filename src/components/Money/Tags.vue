<template>
  <div class="tags">
    <ol>
      <li v-for="tag in tagsByType" :key="tag.id"
          :class="handleActiveClass(multiple, tag.id)"
          @click="handleToggles(multiple, tag.id)">
        <div>
          <Icon :name="tag.icon"/>
        </div>
        <span>{{ tag.name }}</span>
      </li>

      <router-link :to="`/setTag/${type}`">
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

@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    }
  }
})
export default class Tags extends mixins(TagHelper) {
  @Prop() readonly type!: '-' | '+';
  @Prop() readonly lastOne!: [];
  @Prop() readonly multiple?: boolean;

  created() {
    this.$store.commit('fetchTags');
  }

  get tagsByType() {
    return this.$store.state.tagList.filter((tag: Tag) => tag.type === this.type);
  }

  handleActiveClass(multiple: boolean, tagID: string) {
    if (multiple) {
      if (this.selectedTagIDs.indexOf(tagID) >= 0) {
        return 'selected';
      }
    } else {
      if (tagID === this.selectedTagID) {
        return 'selected';
      }
    }
  }

  handleToggles(multiple: boolean, tagID: string) {
    if (multiple) {
      this.onToggleTags(tagID);
    } else {
      this.onToggleTag(tagID);
    }
  }

  selectedTagIDs: string[] = [];

  onToggleTags(tagID: string) {
    const index = this.selectedTagIDs.indexOf(tagID);
    if (index >= 0) {
      this.selectedTagIDs.splice(index, 1);
    } else {
      this.selectedTagIDs.push(tagID);
    }
  }

  selectedTagID = '';

  onToggleTag(tagID: string) {
    this.selectedTagID = tagID !== this.selectedTagID ? tagID : '';
    this.$emit('update:value', this.selectedTagID);
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