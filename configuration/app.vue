<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
          </h1>
          <h2 class="subtitle">
            Primary subtitle
          </h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <!-- CONTAINER -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Container</label>
              </div>
              <div class="field-body">
                <input class="input" type="text" placeholder=".container" v-model="codeParts.container">
              </div>
            </div>
            <!-- ACTION -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Action</label>
              </div>
              <div class="field-body">
                <textarea class="textarea" placeholder="console.log('Scrooolling!')" v-model="codeParts.action"></textarea>
              </div>
            </div>
            <!-- CONDITIONS -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Conditions</label>
              </div>
              <div class="field-body">
                <div class="tile is-ancestor">
                  <div class="tile is-vertical">
                    <div class="tile is-parent">
                      <div class="field tile is-child">
                        <label class="label">Directions</label>
                        <div class="select is-multiple">
                          <select multiple size="3" v-model="codeParts.conditions.directions">
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
                      <div class="field tile is-child">
                        <label class="label">Offset</label>
                        <input class="input" type="number" placeholder="x" v-model="codeParts.conditions.offset.x">
                        <input class="input" type="number" placeholder="y" v-model="codeParts.conditions.offset.y">
                      </div>
                    </div>
                    <div class="tile is-parent">
                      <div class="field tile is-child">
                        <label class="label">Custom</label>
                        <textarea class="textarea" placeholder="return true" v-model="codeParts.conditions.custom"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- THROTTLING -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Throttling</label>
              </div>
              <div class="field-body">
                <input class="input" type="number" placeholder="200" v-model="codeParts.throttling">
              </div>
            </div>
            <!-- ONCE -->
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Once</label>
              </div>
              <div class="field-body">
                <label class="checkbox">
                  <input type="checkbox" v-model="codeParts.once">
                </label>
              </div>
            </div>
          </div>
          <div class="column notification is-primary">
            <pre><code>{{ code }}</code></pre>
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
    codeParts: {
      constructor: 'new Actonscroll()',
      container: '',
      action: '',
      conditions: {
        directions: [],
        offset: {},
        custom: '',
      },
      throttling: '',
      once: '',
      start: 'start()',
    },
  }),
  computed: {
    containerCall: function() {
      return this.codeParts.container !== '' && `.container(document.querySelector('${this.codeParts.container}'))`;
    },
    actionCall: function() {
      return this.codeParts.action !== '' && `.action((verifiedConditions) => {\n    ${this.codeParts.action}\n  })`;
    },
    directionCondition: function() {
      return this.codeParts.conditions.directions.length !== 0
        && `directions: [${this.codeParts.conditions.directions.map(direction => `'${direction}'`).join(', ')}],`;
    },
    offsetCondition: function() {
      return (this.codeParts.conditions.offset.x || this.codeParts.conditions.offset.y)
        && 'offset: {\n      '
          .concat([
            this.codeParts.conditions.offset.x && `x: ${this.codeParts.conditions.offset.x},`,
            this.codeParts.conditions.offset.y && `y: ${this.codeParts.conditions.offset.y},`,
           ].filter(Boolean).join('\n      '))
          .concat('\n    }),');
    },
    customCondition: function() {
      return this.codeParts.conditions.custom !== ''
        && `custom: () => {\n      ${this.codeParts.conditions.custom}\n    },`;
    },
    conditionsCall: function() {
      return (this.directionCondition || this.offsetCondition || this.customCondition)
        && '.conditions({\n    '
          .concat([this.directionCondition, this.offsetCondition, this.customCondition].filter(Boolean).join('\n    '))
          .concat('\n  }),');
    },
    throttlingCall: function() {
      return this.codeParts.throttling !== '' && `.throttling(${this.codeParts.throttling})`;
    },
    onceCall: function() {
      return this.codeParts.once && `.once()`;
    },
    code: function() {
      return [
        `(${this.codeParts.constructor})`,
        this.containerCall,
        this.actionCall,
        this.conditionsCall,
        this.throttlingCall,
        this.onceCall,
        `.${this.codeParts.start};`,
      ].filter(Boolean).join('\n  ');
    },
  },
};
</script>

<style scoped>
  @import './app.scss';
</style>