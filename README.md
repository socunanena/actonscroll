Tool to perform an action when a user scrolls in a web page.

# Installation

```bash
$ yarn add actonscroll
```

# Usage

## Basic example

```javascript
import actonscroll from 'actonscroll';

actonscroll.create()
  .action(() => console.log('Scrooolling!'))
  .listen();
```

# Documentation

<a name="actonscroll"></a>

## actonscroll (factory)
Allows you to create several <code>ScrollListener</code> instances.

**Kind**: global object

* [actonscroll](#actonscroll)
  * [.create()](#actonscroll+create) ⇒ [<code>ScrollListener</code>](#ScrollListener)

<a name="actonscroll+create"></a>

### actonscroll.create() ⇒ [<code>ScrollListener</code>](#ScrollListener)
Creates an instance of [<code>ScrollListener</code>](#ScrollListener).

**Kind**: function

**Example**
```js
const scrollListener = actonscroll.create();
```

<a name="ScrollListener"></a>

## ScrollListener
Executes a predefined action when the scroll event is triggered.

**Kind**: global class

* [ScrollListener](#ScrollListener)
    * [.container(container)](#ScrollListener+container) ⇒ [<code>ScrollListener</code>](#ScrollListener)
    * [.action(action)](#ScrollListener+action) ⇒ [<code>ScrollListener</code>](#ScrollListener)
    * [.conditions(conditions)](#ScrollListener+conditions) ⇒ [<code>ScrollListener</code>](#ScrollListener)
    * [.throttling(throttling)](#ScrollListener+throttling) ⇒ [<code>ScrollListener</code>](#ScrollListener)
    * [.once([once])](#ScrollListener+once) ⇒ [<code>ScrollListener</code>](#ScrollListener)
    * [.listen()](#ScrollListener+listen)
    * [.revoke()](#ScrollListener+revoke)

<a name="ScrollListener+container"></a>

### scrollListener.container(container) ⇒ [<code>ScrollListener</code>](#ScrollListener)
Sets the container element within which the scroll will be listened.

**Kind**: instance method of [<code>ScrollListener</code>](#ScrollListener)

| Param | Type |
| --- | --- |
| container | <code>Element</code> |

**Example**
```js
scrollListener.container(document.querySelector('.my-container'));
```
<a name="ScrollListener+action"></a>

### scrollListener.action(action) ⇒ [<code>ScrollListener</code>](#ScrollListener)
Sets an action to be performed when the scroll event is triggered.

**Kind**: instance method of [<code>ScrollListener</code>](#ScrollListener)

| Param | Type |
| --- | --- |
| action | <code>function</code> |

**Example**
```js
scrollListener.action(() => console.log('Scrooolling!'));
```
<a name="ScrollListener+conditions"></a>

### scrollListener.conditions(conditions) ⇒ [<code>ScrollListener</code>](#ScrollListener)
Sets a list of conditions to determine whether the configured action has to be performed or not.

**Kind**: instance method of [<code>ScrollListener</code>](#ScrollListener)

| Param | Type | Description |
| --- | --- | --- |
| conditions | <code>Object</code> |  |
| conditions.direction | <code>string</code> | Allowed values: <code>'up'</code>, <code>'down'</code>. |
| conditions.custom | <code>Function</code> |  |

**Example**
```js
scrollListener.conditions({
  direction: 'up',
  custom: () => true,
});
```
<a name="ScrollListener+throttling"></a>

### scrollListener.throttling(throttling) ⇒ [<code>ScrollListener</code>](#ScrollListener)
Sets a throttling time (ms) to the scroll event.

**Kind**: instance method of [<code>ScrollListener</code>](#ScrollListener)

| Param | Type |
| --- | --- |
| throttling | <code>number</code> |

**Example**
```js
scrollListener.throttling(1000);
```
<a name="ScrollListener+once"></a>

### scrollListener.once([once]) ⇒ [<code>ScrollListener</code>](#ScrollListener)
Determines whether the action should be performed once or not.

**Kind**: instance method of [<code>ScrollListener</code>](#ScrollListener)

| Param | Type | Default |
| --- | --- | --- |
| [once] | <code>boolean</code> | <code>true</code> |

**Example**
```js
scrollListener.once();
```
<a name="ScrollListener+listen"></a>

### scrollListener.listen()
Executes the configured action after checking that all the conditions are satisfied.

**Kind**: instance method of [<code>ScrollListener</code>](#ScrollListener)
**Example**
```js
scrollListener.listen();
```
<a name="ScrollListener+revoke"></a>

### scrollListener.revoke()
Removes the listener from the configured container.

**Kind**: instance method of [<code>ScrollListener</code>](#ScrollListener)
**Example**
```js
scrollListener.revoke();
```
