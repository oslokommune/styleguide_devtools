<template>
  <div class="pageBuilder">
    <section class="hero is-primary">
      <div class="hero-body">
        <h6>
          Developer tools for
        </h6>
        <h1 class="title">
          Pages
        </h1>
      </div>
    </section>
    <div class="columns">
      <div class="column">
        iframe
      </div>
      <div class="column is-one-third">
        <div class="buttons has-addons">
          <button class="button" @click="addRow">
            <span class="icon">
              <i class="fas fa-plus"></i>
            </span>
          </button>
        </div>
        <div class="columns" v-for="(row, rowIndex) in page.rows" :key="rowIndex">
          <div class="column" v-for="(column, columnIndex) in row.columns" :key="columnIndex">
            col
          </div>
          <div class="column">
            <button class="button" @click="addColumn(row)">
              <span class="icon">
                <i class="fas fa-plus"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pageBuilder',

    data: () => ({
      page: {
        rows: []
      }
    }),

    methods: {
      addRow() {
        this.page.rows.push({
          columns: [
            {
              pattern: null
            }
          ]
        })
      },

      addColumn(row) {
        row.columns.push({
          pattern: null
        })
      }
    }
  }
</script>
