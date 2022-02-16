/*
 * Helper constants and functions
 */

// make it easier for ourselves by putting some values in objects
// in TypeScript, these would be enums
const Keys = {
  Backspace: 'Backspace',
  Clear: 'Clear',
  Down: 'ArrowDown',
  End: 'End',
  Enter: 'Enter',
  Escape: 'Escape',
  Home: 'Home',
  Left: 'ArrowLeft',
  PageDown: 'PageDown',
  PageUp: 'PageUp',
  Right: 'ArrowRight',
  Space: ' ',
  Tab: 'Tab',
  Up: 'ArrowUp'
}

const MenuActions = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  Previous: 6,
  Select: 7,
  Space: 8,
  Type: 9
}

// filter an array of options against an input string
// returns an array of options that begin with the filter string, case-independent
function filterOptions(options = [], filter, exclude = []) {
  return options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

// return an array of exact option name matches from a comma-separated string
function findMatches(options, search) {
  const names = search.split(',');
  return names.map((name) => {
    const match = options.filter((option) => name.trim().toLowerCase() === option.toLowerCase());
    return match.length > 0 ? match[0] : null;
  })
  .filter((option) => option !== null);
}

// return combobox action from key press
function getActionFromKey(event, menuOpen) {
  const { key, altKey, ctrlKey, metaKey } = event;
  // handle opening when closed
  if (!menuOpen && (key === Keys.Down || key === Keys.Enter || key === Keys.Space)) {
    return MenuActions.Open;
  }

  // handle keys when open
  if (key === Keys.Down) {
    return MenuActions.Next;
  }
  else if (key === Keys.Up) {
    return MenuActions.Previous;
  }
  else if (key === Keys.Home) {
    return MenuActions.First;
  }
  else if (key === Keys.End) {
    return MenuActions.Last;
  }
  else if (key === Keys.Escape) {
    return MenuActions.Close;
  }
  else if (key === Keys.Enter) {
    return MenuActions.CloseSelect;
  }
  else if (key === Keys.Space) {
    return MenuActions.Space;
  }
  else if (key === Keys.Backspace || key === Keys.Clear || (key.length === 1 && !altKey && !ctrlKey && !metaKey)) {
    return MenuActions.Type;
  }
}

// get index of option that matches a string
// if the filter is multiple iterations of the same letter (e.g "aaa"),
// then return the nth match of the single letter
function getIndexByLetter(options, filter) {
  const firstMatch = filterOptions(options, filter)[0];
  const allSameLetter = (array) => array.every((letter) => letter === array[0]);
  console.log('testing string', filter);

  if (firstMatch) {
    return options.indexOf(firstMatch);
  }
  else if (allSameLetter(filter.split(''))) {
    const matches = filterOptions(options, filter[0]);
    const matchIndex = (filter.length - 1) % matches.length;
    return options.indexOf(matches[matchIndex]);
  }
  else {
    return -1;
  }
}

// get updated option index
function getUpdatedIndex(current, max, action) {
  switch(action) {
    case MenuActions.First:
      return 0;
    case MenuActions.Last:
      return max;
    case MenuActions.Previous:
      return Math.max(0, current - 1);
    case MenuActions.Next:
      return Math.min(max, current + 1);
    default:
      return current;
  }
}

// check if an element is currently scrollable
function isScrollable(element) {
  return element && element.clientHeight < element.scrollHeight;
}

// ensure given child element is within the parent's visible scroll area
function maintainScrollVisibility(activeElement, scrollParent) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = (offsetTop + offsetHeight) > (scrollTop + parentOffsetHeight);

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  }
  else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}


const options = ['Apple', 'Banana', 'Blueberry', 'Boysenberry', 'Cherry', 'Durian', 'Eggplant', 'Fig', 'Grape', 'Guava', 'Huckleberry'];

/*
 * Editable Combobox code
 */
const Combobox = function(el, options) {
  // element refs
  this.el = el;
  this.inputEl = el.querySelector('input');
  this.listboxEl = el.querySelector('[role=listbox]');

  // data
  this.idBase = this.inputEl.id;
  this.options = options;

  // state
  this.activeIndex = 0;
  this.open = false;
}

Combobox.prototype.init = function() {
  this.inputEl.value = options[0];

  this.inputEl.addEventListener('input', this.onInput.bind(this));
  this.inputEl.addEventListener('blur', this.onInputBlur.bind(this));
  this.inputEl.addEventListener('click', () => this.updateMenuState(true));
  this.inputEl.addEventListener('keydown', this.onInputKeyDown.bind(this));

  this.options.map((option, index) => {
    const optionEl = document.createElement('div');
    optionEl.setAttribute('role', 'option');
    optionEl.id = `${this.idBase}-${index}`;
    optionEl.className = index === 0 ? 'combo-option option-current' : 'combo-option';
    optionEl.setAttribute('aria-selected', `${index === 0}`);
    optionEl.innerText = option;

    optionEl.addEventListener('click', () => { this.onOptionClick(index); });
    optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));

    this.listboxEl.appendChild(optionEl);
  });
}

Combobox.prototype.onInput = function() {
  const curValue = this.inputEl.value;
  const matches = filterOptions(this.options, curValue);

  // set activeIndex to first matching option
  // (or leave it alone, if the active option is already in the matching set)
  const filterCurrentOption = matches.filter((option) => option === this.options[this.activeIndex]);
  if (matches.length > 0 && !filterCurrentOption.length) {
    this.onOptionChange(this.options.indexOf(matches[0]));
  }

  const menuState = this.options.length > 0;
  if (this.open !== menuState) {
    this.updateMenuState(menuState, false);
  }
}

Combobox.prototype.onInputKeyDown = function(event) {
  const max = this.options.length - 1;

  const action = getActionFromKey(event, this.open);

  switch(action) {
    case MenuActions.Next:
    case MenuActions.Last:
    case MenuActions.First:
    case MenuActions.Previous:
      event.preventDefault();
      return this.onOptionChange(getUpdatedIndex(this.activeIndex, max, action));
    case MenuActions.CloseSelect:
      event.preventDefault();
      this.selectOption(this.activeIndex);
      return this.updateMenuState(false);
    case MenuActions.Close:
      event.preventDefault();
      return this.updateMenuState(false);
    case MenuActions.Open:
      return this.updateMenuState(true);
  }
}

Combobox.prototype.onInputBlur = function() {
  if (this.ignoreBlur) {
    this.ignoreBlur = false;
    return;
  }

  if (this.open) {
    this.selectOption(this.activeIndex);
    this.updateMenuState(false, false);
  }
}

Combobox.prototype.onOptionChange = function(index) {
  this.activeIndex = index;
  this.inputEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

  // update active style
  const options = this.el.querySelectorAll('[role=option]');
  [...options].forEach((optionEl) => {
    optionEl.classList.remove('option-current');
  });
  options[index].classList.add('option-current');

  if (this.open && isScrollable(this.listboxEl)) {
    maintainScrollVisibility(options[index], this.listboxEl);
  }
}

Combobox.prototype.onOptionClick = function(index) {
  this.onOptionChange(index);
  this.selectOption(index);
  this.updateMenuState(false);
}

Combobox.prototype.onOptionMouseDown = function() {
  this.ignoreBlur = true;
}

Combobox.prototype.selectOption = function(index) {
  const selected = this.options[index];
  this.inputEl.value = selected;
  this.activeIndex = index;

  // update aria-selected
  const options = this.el.querySelectorAll('[role=option]');
  [...options].forEach((optionEl) => {
    optionEl.setAttribute('aria-selected', 'false');
  });
  options[index].setAttribute('aria-selected', 'true');
}

Combobox.prototype.updateMenuState = function(open, callFocus = true) {
  this.open = open;

  this.inputEl.setAttribute('aria-expanded', `${open}`);
  open ? this.el.classList.add('open') : this.el.classList.remove('open');
  callFocus && this.inputEl.focus();
}

// init combo
if(document.querySelector('.js-combobox')) {
  const comboEl = document.querySelector('.js-combobox');
  const comboComponent = new Combobox(comboEl, options);
  comboComponent.init();
}







/*
 * Read-only select code
 */
 const Select = function(el, options) {
  // element refs
  this.el = el;
  this.comboEl = el.querySelector('[role=combobox]');
  this.valueEl = this.comboEl.querySelector('span');
  this.listboxEl = el.querySelector('[role=listbox]');

  // data
  this.idBase = this.comboEl.id;
  this.options = options;

  // state
  this.activeIndex = 0;
  this.open = false;
  this.searchString = '';
  this.searchTimeout = null;
}

Select.prototype.init = function() {
  this.valueEl.innerHTML = options[0];

  this.comboEl.addEventListener('blur', this.onComboBlur.bind(this));
  this.comboEl.addEventListener('click', () => this.updateMenuState(true));
  this.comboEl.addEventListener('keydown', this.onComboKeyDown.bind(this));

  this.options.map((option, index) => {
    const optionEl = document.createElement('div');
    optionEl.setAttribute('role', 'option');
    optionEl.id = `${this.idBase}-${index}`;
    optionEl.className = index === 0 ? 'combo-option option-current' : 'combo-option';
    optionEl.setAttribute('aria-selected', `${index === 0}`);
    optionEl.innerText = option;

    optionEl.addEventListener('click', (event) => {
      event.stopPropagation();
      this.onOptionClick(index);
    });
    optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));

    this.listboxEl.appendChild(optionEl);
  });
}

Select.prototype.getSearchString = function(char) {
  if (typeof this.searchTimeout === 'number') {
    window.clearTimeout(this.searchTimeout);
  }

  this.searchTimeout = window.setTimeout(() => {
    this.searchString = '';
  }, 1000);

  this.searchString += char;
  return this.searchString;
}

Select.prototype.onComboKeyDown = function(event) {
  const { key } = event;
  const max = this.options.length - 1;

  const action = getActionFromKey(event, this.open);

  switch(action) {
      case MenuActions.Next:
      case MenuActions.Last:
      case MenuActions.First:
      case MenuActions.Previous:
        event.preventDefault();
        return this.onOptionChange(getUpdatedIndex(this.activeIndex, max, action));
      case MenuActions.CloseSelect:
      case MenuActions.Space:
        event.preventDefault();
        this.selectOption(this.activeIndex);
      case MenuActions.Close:
        event.preventDefault();
        return this.updateMenuState(false);
      case MenuActions.Type:
        this.updateMenuState(true);
        var searchString = this.getSearchString(key);
        return this.onOptionChange(Math.max(0, getIndexByLetter(this.options, searchString)));
      case MenuActions.Open:
        event.preventDefault();
        return this.updateMenuState(true);
    }
}

Select.prototype.onComboBlur = function() {
  if (this.ignoreBlur) {
    this.ignoreBlur = false;
    return;
  }

  if (this.open) {
    this.selectOption(this.activeIndex);
    this.updateMenuState(false, false);
  }
}

Select.prototype.onOptionChange = function(index) {
  this.activeIndex = index;
  this.comboEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

  // update active style
  const options = this.el.querySelectorAll('[role=option]');
  [...options].forEach((optionEl) => {
    optionEl.classList.remove('option-current');
  });
  options[index].classList.add('option-current');

  if (isScrollable(this.listboxEl)) {
    maintainScrollVisibility(options[index], this.listboxEl);
  }
}

Select.prototype.onOptionClick = function(index) {
  this.onOptionChange(index);
  this.selectOption(index);
  this.updateMenuState(false);
}

Select.prototype.onOptionMouseDown = function() {
  this.ignoreBlur = true;
}

Select.prototype.selectOption = function(index) {
  const selected = this.options[index];
  this.valueEl.innerHTML = selected;
  this.activeIndex = index;

  // update aria-selected
  const options = this.el.querySelectorAll('[role=option]');
  [...options].forEach((optionEl) => {
    optionEl.setAttribute('aria-selected', 'false');
  });
  options[index].setAttribute('aria-selected', 'true');
}

Select.prototype.updateMenuState = function(open, callFocus = true) {
  this.open = open;

  this.comboEl.setAttribute('aria-expanded', `${open}`);
  open ? this.el.classList.add('open') : this.el.classList.remove('open');
  callFocus && this.comboEl.focus();

  // update activedescendant
  const activeID = open ? `${this.idBase}-${this.activeIndex}` : this.valueEl.id;
  this.comboEl.setAttribute('aria-activedescendant', activeID);
}

// init select
if(document.querySelector('.js-select')) {
  const selectEl = document.querySelector('.js-select');
  const selectComponent = new Select(selectEl, options);
  selectComponent.init();
}










/*
 * Multiselect code
 */
 const Multiselect = function(el, options) {
  // element refs
  this.el = el;
  this.inputEl = el.querySelector('input');
  this.listboxEl = el.querySelector('[role=listbox]');

  this.idBase = this.inputEl.id;
  this.selectedEl = document.getElementById(`${this.idBase}-selected`);

  // data
  this.options = options;

  // state
  this.activeIndex = 0;
  this.open = false;
}

Multiselect.prototype.init = function() {
  this.inputEl.addEventListener('input', this.onInput.bind(this));
  this.inputEl.addEventListener('blur', this.onInputBlur.bind(this));
  this.inputEl.addEventListener('click', () => this.updateMenuState(true));
  this.inputEl.addEventListener('keydown', this.onInputKeyDown.bind(this));
  this.listboxEl.addEventListener('blur', this.onInputBlur.bind(this));

  this.options.map((option, index) => {
    const optionEl = document.createElement('div');
    optionEl.setAttribute('role', 'option');
    optionEl.id = `${this.idBase}-${index}`;
    optionEl.className = index === 0 ? 'combo-option option-current' : 'combo-option';
    optionEl.setAttribute('aria-selected', 'false');
    optionEl.innerHTML = option + `<svg width="24" height="24" viewBox="-1 -1 26 26" aria-hidden="true" focusable="false">
                <!-- The background -->
                <path class="cb-bg" stroke-width="2" stroke="currentColor"
                    d="M2 0H22C22.5304 0 23.0391 0.210714 23.4142 0.585786C23.7893 0.960859 24 1.46957 24 2V22C24 22.5304 23.7893 23.0391 23.4142 23.4142C23.0391 23.7893 22.5304 24 22 24H2C1.46957 24 0.960859 23.7893 0.585786 23.4142C0.210714 23.0391 0 22.5304 0 22V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0V0Z"
                    fill="currentColor" />

                <!-- The checkmark-->
                <path class="cb-cm" fill-rule="evenodd" clip-rule="evenodd"
                    d="M18.1 8.7C18.0962 8.88542 18.0251 9.06313 17.9 9.2L12.2 14.9L11.1 16C10.9631 16.1251 10.7854 16.1962 10.6 16.2C10.4146 16.1962 10.2369 16.1251 10.1 16L9 14.9L6.2 12.1C6.07486 11.9631 6.00377 11.7854 6 11.6C6.00377 11.4146 6.07486 11.2369 6.2 11.1L7.3 10C7.43687 9.87486 7.61458 9.80377 7.8 9.8C7.98542 9.80377 8.16313 9.87486 8.3 10L10.6 12.3L15.7 7.2C15.8369 7.07486 16.0146 7.00377 16.2 7C16.3854 7.00377 16.5631 7.07486 16.7 7.2L17.8 8.3C18 8.4 18.1 8.5 18.1 8.7Z"
                    fill="inherit" />
            </svg>`;

    optionEl.addEventListener('click', () => { this.onOptionClick(index); });
    optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));

    this.listboxEl.appendChild(optionEl);
  });
}

Multiselect.prototype.onInput = function() {
  const curValue = this.inputEl.value;
  const matches = filterOptions(this.options, curValue);

  // set activeIndex to first matching option
  // (or leave it alone, if the active option is already in the matching set)
  const filterCurrentOption = matches.filter((option) => option === this.options[this.activeIndex]);
  if (matches.length > 0 && !filterCurrentOption.length) {
    this.onOptionChange(this.options.indexOf(matches[0]));
  }

  const menuState = this.options.length > 0;
  if (this.open !== menuState) {
    this.updateMenuState(menuState, false);
  }
}

Multiselect.prototype.onInputKeyDown = function(event) {
  const max = this.options.length - 1;

  const action = getActionFromKey(event, this.open);

  switch(action) {
    case MenuActions.Next:
    case MenuActions.Last:
    case MenuActions.First:
    case MenuActions.Previous:
      event.preventDefault();
      return this.onOptionChange(getUpdatedIndex(this.activeIndex, max, action));
    case MenuActions.CloseSelect:
      event.preventDefault();
      return this.updateOption(this.activeIndex);
    case MenuActions.Close:
      event.preventDefault();
      return this.updateMenuState(false);
    case MenuActions.Open:
      return this.updateMenuState(true);
  }
}

Multiselect.prototype.onInputBlur = function() {
  if (this.ignoreBlur) {
    this.ignoreBlur = false;
    return;
  }

  if (this.open) {
    this.updateMenuState(false, false);
  }
}

Multiselect.prototype.onOptionChange = function(index) {
  this.activeIndex = index;
  this.inputEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

  // update active style
  const options = this.el.querySelectorAll('[role=option]');
  [...options].forEach((optionEl) => {
    optionEl.classList.remove('option-current');
  });
  options[index].classList.add('option-current');

  if (this.open && isScrollable(this.listboxEl)) {
    maintainScrollVisibility(options[index], this.listboxEl);
  }
}

Multiselect.prototype.onOptionClick = function(index) {
  this.onOptionChange(index);
  this.updateOption(index);
  this.inputEl.focus();
}

Multiselect.prototype.onOptionMouseDown = function() {
  this.ignoreBlur = true;
}

Multiselect.prototype.removeOption = function(index) {
  const option = this.options[index];

  // update aria-selected
  const options = this.el.querySelectorAll('[role=option]');
  options[index].setAttribute('aria-selected', 'false');
  options[index].classList.remove('option-selected');

  // remove button
  const buttonEl = document.getElementById(`${this.idBase}-remove-${index}`);
  this.selectedEl.removeChild(buttonEl.parentElement);
}

Multiselect.prototype.selectOption = function(index) {
  const selected = this.options[index];
  this.activeIndex = index;

  // update aria-selected
  const options = this.el.querySelectorAll('[role=option]');
  options[index].setAttribute('aria-selected', 'true');
  options[index].classList.add('option-selected');

  // add remove option button
  const buttonEl = document.createElement('button');
  const listItem = document.createElement('li');
  buttonEl.className = 'remove-option';
  buttonEl.type = 'button';
  buttonEl.id = `${this.idBase}-remove-${index}`;
  buttonEl.setAttribute('aria-describedby', `${this.idBase}-remove`);
  buttonEl.addEventListener('click', () => { this.removeOption(index); });
  buttonEl.innerHTML = selected + `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" focusable="false"><path d="M9 3L3 9M3 3L9 9" stroke="var(--dark-icon-color)" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  listItem.appendChild(buttonEl);
  this.selectedEl.appendChild(listItem);
}

Multiselect.prototype.updateOption = function(index) {
  const option = this.options[index];
  const optionEl = this.el.querySelectorAll('[role=option]')[index];
  const isSelected = optionEl.getAttribute('aria-selected') === 'true';

  if (isSelected) {
    this.removeOption(index);
  }

  else {
    this.selectOption(index);
  }

  this.inputEl.value = '';
}

Multiselect.prototype.updateMenuState = function(open, callFocus = true) {
  this.open = open;

  this.inputEl.setAttribute('aria-expanded', `${open}`);
  open ? this.el.classList.add('open') : this.el.classList.remove('open');
  callFocus && this.inputEl.focus();
}


// init multiselect
if(document.querySelector('.js-multiselect')) {
  const multiselectEl = document.querySelectorAll('.js-multiselect');

  multiselectEl.forEach(select => {
    const multiselectComponent = new Multiselect(select, options);
    multiselectComponent.init();
  })

}
