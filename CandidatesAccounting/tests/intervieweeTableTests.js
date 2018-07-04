import { Selector } from 'testcafe'
import { signIn } from './common'
import handleScreenshot from './handleScreenshot'

fixture(`Interviewee table tests`)
  .page(`http://localhost:3000/interviewees/`)
  .beforeEach(signIn)

test('Add new interviewee form Name input', async t => {
  await t
  .click(Selector('button[data-test-add-candidate-button]'))

  await handleScreenshot(t, Selector('div[data-test-candidate-form]'))

  await t
  .typeText(Selector('textarea[mark="data-test-candidate-name-input"]'), 'Иванов Иван Иванович')

  await handleScreenshot(t, Selector('div[data-test-candidate-form]'))
})

test('Add new interviewee form Email input', async t => {
  await t
  .click(Selector('button[data-test-add-candidate-button]'))
  .typeText(Selector('textarea[mark="data-test-candidate-email-input"]'), 'ivanov.ivan@mail.com')

  await handleScreenshot(t, Selector('div[data-test-candidate-form]'))
})