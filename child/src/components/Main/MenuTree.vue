<template>
  <div>
    <template v-for="menu in this.menuData">
      <el-submenu
        :key="menu.index"
        :index="menu.router"
        v-if="menu.subMenus !== undefined && menu.subMenus.length >0"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.index}}</span>
        </template>
        <menu-tree :menuData="menu.subMenus"></menu-tree>
      </el-submenu>
      <el-menu-item :key="menu.index" :index="menu.router" :route="menu.router" v-else>
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.index}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  props: ['menuData'],
  name: 'MenuTree'
}
</script>
