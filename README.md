Tool to perform an action when a user scrolls in a web page.

# Installation

```bash
$ yarn add actonscroll
```

# Usage

```javascript
import Actonscroll from 'actonscroll';

// Passing arguments to the creator
(new Actonscroll({ action: () => console.log('Scrooolling!') }))
  .start();

// Calling specific method for each option
(new Actonscroll())
  .action(() => console.log('Scrooolling!'))
  .start();

// Stop
const actonscroll = new Actonscroll();
actonscroll.start();
actonscroll.stop();
```

# Documentation

<a name="Actonscroll"></a>

## Actonscroll
Executes a predefined action when the scroll event is triggered.

**Kind**: global class

* [Actonscroll](#Actonscroll)
    * [.container(container)](#Actonscroll+container) ⇒ [<code>Actonscroll</code>](#Actonscroll)
    * [.action(action)](#Actonscroll+action) ⇒ [<code>Actonscroll</code>](#Actonscroll)
    * [.conditions(conditions)](#Actonscroll+conditions) ⇒ [<code>Actonscroll</code>](#Actonscroll)
    * [.throttling(throttling)](#Actonscroll+throttling) ⇒ [<code>Actonscroll</code>](#Actonscroll)
    * [.once([once])](#Actonscroll+once) ⇒ [<code>Actonscroll</code>](#Actonscroll)
    * [.start()](#Actonscroll+start)
    * [.stop()](#Actonscroll+stop)

### new Actonscroll([options])

| Param | Type |
| --- | --- |
| [options] | <code>Object</code> |
| [options.container] | <code>Document</code> / <code>Element</code> |
| [options.action] | <code>function</code> |
| [options.conditions] | <code>Object</code> |
| [options.throttling] | <code>number</code> |
| [options.once] | <code>boolean</code> |

<a name="Actonscroll+container"></a>

### actonscroll.container(container) ⇒ [<code>Actonscroll</code>](#Actonscroll)
Sets the container element within which the scroll will be listened.

**Kind**: instance method of [<code>Actonscroll</code>](#Actonscroll)

| Param | Type |
| --- | --- |
| container | <code>Element</code> |

**Example**
```js
actonscroll.container(document.querySelector('.my-container'));
```
<a name="Actonscroll+action"></a>

### actonscroll.action(action) ⇒ [<code>Actonscroll</code>](#Actonscroll)
Sets an action to be performed when the scroll event is triggered.

**Kind**: instance method of [<code>Actonscroll</code>](#Actonscroll)

| Param | Type |
| --- | --- |
| action | <code>function</code> |

**Example**
```js
actonscroll.action(() => console.log('Scrooolling!'));
```
<a name="Actonscroll+conditions"></a>

### actonscroll.conditions(conditions) ⇒ [<code>Actonscroll</code>](#Actonscroll)
Sets a list of conditions to determine whether the configured action has to be performed or not.

**Kind**: instance method of [<code>Actonscroll</code>](#Actonscroll)

| Param | Type | Description |
| --- | --- | --- |
| conditions | <code>Object</code> |  |
| conditions.directions | <code>Array.&lt;string&gt;</code> | Allowed values: <code>'all'</code>, <code>'vertical'</code>, <code>'horizontal'</code>, <code>'up'</code>, <code>'down'</code>, <code>'left'</code>, <code>'right'</code>. |
| conditions.offset | <code>Object</code> | <code>{ x, y }</code> (In pixels). |
| conditions.custom | <code>function</code> |  |

**Example**
```js
actonscroll.conditions({
  directions: ['up', 'left'],
  offset: { y: 200 },
  custom: () => true,
});
```
<a name="Actonscroll+throttling"></a>

### actonscroll.throttling(throttling) ⇒ [<code>Actonscroll</code>](#Actonscroll)
Sets a throttling time (ms) to the scroll event.

**Kind**: instance method of [<code>Actonscroll</code>](#Actonscroll)

| Param | Type |
| --- | --- |
| throttling | <code>number</code> |

**Example**
```js
actonscroll.throttling(1000);
```
<a name="Actonscroll+once"></a>

### actonscroll.once([once]) ⇒ [<code>Actonscroll</code>](#Actonscroll)
Determines whether the action should be performed once or not.

**Kind**: instance method of [<code>Actonscroll</code>](#Actonscroll)

| Param | Type | Default |
| --- | --- | --- |
| [once] | <code>boolean</code> | <code>true</code> |

**Example**
```js
actonscroll.once();
```
<a name="Actonscroll+start"></a>

### actonscroll.start()
Executes the configured action after checking that all the conditions are satisfied.

**Kind**: instance method of [<code>Actonscroll</code>](#Actonscroll)
**Example**
```js
actonscroll.start();
```
<a name="Actonscroll+stop"></a>

### actonscroll.stop()
Removes the actonscroll from the configured container.

**Kind**: instance method of [<code>Actonscroll</code>](#Actonscroll)
**Example**
```js
actonscroll.stop();
```
