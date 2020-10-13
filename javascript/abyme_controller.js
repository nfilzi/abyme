import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['template', 'associations'];

  connect() {
    console.log('Abyme Connect');
  }

  get position() {
    return this.associationsTarget.dataset.abymePosition === 'end' ? 'beforeend' : 'afterbegin';
  }

  add_association(event) {
    event.preventDefault();

    let html = this.templateTarget.innerHTML.replace(
      /NEW_RECORD/g,
      new Date().getTime()
    );

    if (html.match(/<template[\s\S]+<\/template>/)) {
      const template = html
        .match(/<template[\s\S]+<\/template>/)[0]
        .replace(/(\[\d{12,}\])(\[[^\[\]]+\]"){1}/g, `[NEW_RECORD]$2`);

      html = html.replace(/<template[\s\S]+<\/template>/g, template);
    }

    this.create_event('before-add', html)
    this.associationsTarget.insertAdjacentHTML(this.position, html);
    this.create_event('after-add', html)
  }

  remove_association(event) {
    event.preventDefault();

    this.create_event('before-remove')
    let wrapper = event.target.closest('.abyme--fields');
    wrapper.querySelector("input[name*='_destroy']").value = 1;
    wrapper.style.display = 'none';
    this.create_event('after-remove')
  }

  create_event(stage, html = null) {
    const event = new CustomEvent(`abyme:${stage}`, { detail: {controller: this, content: html} })
    this.element.dispatchEvent(event)
    // WIP
    this.dispatch(event, stage)
  }

  // WIP : Trying to integrate event handling through controller inheritance
  dispatch(event, stage) {
    if (stage === 'before-add' && this.abymeBeforeAdd) this.abymeBeforeAdd(event)
    if (stage === 'after-add' && this.abymeAfterAdd) this.abymeAfterAdd(event)
    if (stage === 'before-remove' && this.abymeBeforeRemove) this.abymeBeforeAdd(event)
    if (stage === 'after-remove' && this.abymeAfterRemove) this.abymeAfterRemove(event)
  }

  abymeBeforeAdd(event) {
  }

  abymeAfterAdd(event) {
  }

  abymeBeforeRemove(event) {
  }

  abymeAfterRemove(event) {
  }
}