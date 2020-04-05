<template>
  <div>
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Actonscroll code generator
          </h1>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-two-thirds">
            <!-- CONTAINER -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Container</label>
              </div>
              <div class="field-body">
                <input class="input" type="text" placeholder=".container" v-model="container">
              </div>
            </div>
            <!-- CONTAINER end -->
            <!-- ACTION -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Action</label>
              </div>
              <div class="field-body">
                <textarea class="textarea" placeholder="console.log('Scrooolling!')" v-model="action"></textarea>
              </div>
            </div>
            <!-- ACTION end -->
            <!-- CONDITIONS -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Conditions</label>
              </div>
              <div class="field-body">
                <div class="columns">
                  <div class="column">
                    <div class="field tile is-child">
                      <label class="label">Directions</label>
                      <div class="select is-multiple">
                        <select multiple size="3" v-model="conditions.directions">
                          <option value="all">all</option>
                          <option value="vertical">vertical</option>
                          <option value="horizontal">horizontal</option>
                          <option value="up">up</option>
                          <option value="down">down</option>
                          <option value="left">left</option>
                          <option value="right">right</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <div class="field tile is-child">
                      <label class="label">Offset</label>
                      <input class="input" type="number" placeholder="x" v-model="conditions.offset.x">
                      <input class="input" type="number" placeholder="y" v-model="conditions.offset.y">
                    </div>
                  </div>
                  <div class="column is-two-thirds">
                    <div class="field tile is-child">
                      <label class="label">Custom</label>
                      <textarea class="textarea" placeholder="return true" v-model="conditions.custom"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- CONDITIONS end -->
            <!-- THROTTLING -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Throttling</label>
              </div>
              <div class="field-body">
                <input class="input" type="number" placeholder="200" v-model="throttling">
              </div>
            </div>
            <!-- THROTTLING end -->
            <!-- ONCE -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Once</label>
              </div>
              <div class="field-body">
                <label class="checkbox">
                  <input type="checkbox" v-model="once">
                </label>
              </div>
            </div>
            <!-- ONCE end -->
          </div>
          <div class="column">
            <pre>{{ code }}</pre>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    container: '',
    action: '',
    conditions: {
      directions: [],
      offset: {},
      custom: '',
    },
    throttling: '',
    once: '',
  }),
  computed: {
    containerCall: function() {
      return this.container !== '' && `.container(document.querySelector('${this.container}'))`;
    },
    actionCall: function() {
      return this.action !== '' && `.action((verifiedConditions) => {\n    ${this.action}\n  })`;
    },
    directionCondition: function() {
      return this.conditions.directions.length !== 0
        && `directions: [${this.conditions.directions.map(direction => `'${direction}'`).join(', ')}],`;
    },
    offsetCondition: function() {
      return (this.conditions.offset.x || this.conditions.offset.y)
        && 'offset: {\n      '
          .concat([
            this.conditions.offset.x && `x: ${this.conditions.offset.x},`,
            this.conditions.offset.y && `y: ${this.conditions.offset.y},`,
           ].filter(Boolean).join('\n      '))
          .concat('\n    }),');
    },
    customCondition: function() {
      return this.conditions.custom !== ''
        && `custom: () => {\n      ${this.conditions.custom}\n    },`;
    },
    conditionsCall: function() {
      return (this.directionCondition || this.offsetCondition || this.customCondition)
        && '.conditions({\n    '
          .concat([this.directionCondition, this.offsetCondition, this.customCondition].filter(Boolean).join('\n    '))
          .concat('\n  }),');
    },
    throttlingCall: function() {
      return this.throttling !== '' && `.throttling(${this.throttling})`;
    },
    onceCall: function() {
      return this.once && `.once()`;
    },
    code: function() {
      return [
        `(new Actonscroll())`,
        this.containerCall,
        this.actionCall,
        this.conditionsCall,
        this.throttlingCall,
        this.onceCall,
        `.start();`,
      ].filter(Boolean).join('\n  ');
    },
  },
};
</script>

<style scoped>
  @import './node_modules/bulma/bulma';
</style>