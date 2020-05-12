describe('expectTwo API Coverage', () => {
  let e;

  beforeEach(() => {
    const IosExpect = require('./expectTwo');
    e = new IosExpect(new MockExecutor());
  });


  describe('Matchers', () => {
    it(`by.accessibilityLabel`, async () => {
      await e.expect(e.element(e.by.accessibilityLabel('test'))).toBeVisible();
      await e.expect(e.element(e.by.accessibilityLabel('test'))).toBeNotVisible();
      await e.expect(e.element(e.by.accessibilityLabel('test'))).toExist();
      await e.expect(e.element(e.by.accessibilityLabel('test'))).toNotExist();
      await e.expect(e.element(e.by.accessibilityLabel('test'))).toHaveText('text');
      await e.expect(e.element(e.by.accessibilityLabel('test'))).toHaveLabel('label');
      await e.expect(e.element(e.by.accessibilityLabel('test'))).toHaveId('id');
      await e.expect(e.element(e.by.accessibilityLabel('test'))).toHaveValue('value');
    });

    it(`by.label (for backwards compat)`, async () => {
      await e.expect(e.element(e.by.label('test'))).toBeVisible();
      await e.expect(e.element(e.by.label('test'))).toBeNotVisible();
      await e.expect(e.element(e.by.label('test'))).toExist();
      await e.expect(e.element(e.by.label('test'))).toNotExist();
      await e.expect(e.element(e.by.label('test'))).toHaveText('text');
      await e.expect(e.element(e.by.label('test'))).toHaveLabel('label');
      await e.expect(e.element(e.by.label('test'))).toHaveId('id');
      await e.expect(e.element(e.by.label('test'))).toHaveValue('value');
    });

    it(`by.id`, async () => {
      await e.expect(e.element(e.by.id('test'))).toBeVisible();
    });

    it(`by.traits`, async () => {
      await e.expect(e.element(e.by.traits(['button', 'link', 'header', 'search']))).toBeVisible();
      await e.expect(e.element(e.by.traits(['image', 'selected', 'plays', 'key']))).toBeNotVisible();
      await e.expect(e.element(e.by.traits(['text', 'summary', 'disabled', 'frequentUpdates']))).toBeNotVisible();
      await e.expect(e.element(e.by.traits(['startsMedia', 'adjustable', 'allowsDirectInteraction', 'pageTurn']))).toBeNotVisible();
    });

    it(`withAncestor, withDescendant`, async () => {
      await e.expect(e.element(e.by.id('test').withAncestor(e.by.id('ancestor')))).toBeVisible();
      await e.expect(e.element(e.by.id('test').withDescendant(e.by.id('descendant')))).toBeVisible();
      await e.expect(e.element(e.by.id('test').and(e.by.type('type')))).toBeVisible();
      // await e.expect(e.element(e.by.id('test').not())).toBeVisible();
    });


    it(`matchers with wrong parameters should throw`, async () => {
      await expectToThrow(() => e.element(e.by.label(5)));
      await expectToThrow(() => e.element(e.by.id(5)));
      await expectToThrow(() => e.by.traits(1));
      // await expectToThrow(() => e.by.traits(['nonExistentTrait']));
      await expectToThrow(() => e.element(e.by.value(0)));
      await expectToThrow(() => e.element(e.by.text(0)));
      await expectToThrow(() => e.element(e.by.id('test').withAncestor('notAMatcher')));
      await expectToThrow(() => e.element(e.by.id('test').withDescendant('notAMatcher')));
      // await expectToThrow(() => e.element(e.by.id('test').and('notAMatcher')));
    });
  });

  describe('Expect', () => {
    it(`expect with wrong parameters should throw`, async () => {
      await expectToThrow(() => e.expect('notAnElement'));
      await expectToThrow(() => e.expect(e.element('notAMatcher')));
    });

  });


  describe('Actions', () => {

    it(`setColumnToValue()`, async () => {
      await e.element(e.by.id('pickerView')).setColumnToValue(1, '6');
      await expectToThrow(() => e.element(e.by.id('pickerView')).setColumnToValue('notAColumn', 1));
      await expectToThrow(() => e.element(e.by.id('pickerView')).setColumnToValue(1, 1));
    });


    it(`interactions`, async () => {
      await e.element(e.by.label('Tap Me')).tap();
      await e.element(e.by.label('Tap Me')).tapAtPoint({ x: 10, y: 10 });
      await e.element(e.by.label('Tap Me')).longPress();
      await e.element(e.by.label('Tap Me')).longPress(2000);
      await e.element(e.by.id('someId')).multiTap(3);
      await e.element(e.by.id('someId')).typeText('passcode');
      await e.element(e.by.id('someId')).tapBackspaceKey();
      await e.element(e.by.id('someId')).tapReturnKey();
      await e.element(e.by.id('someId')).clearText();
      await e.element(e.by.id('someId')).replaceText('replaceTo');
      await e.element(e.by.id('someId')).pinchWithAngle('outward', 'fast', 0);
      await e.element(e.by.id('someId')).pinchWithAngle('outward');
      await e.element(e.by.id('someId')).scroll(100);
      await e.element(e.by.id('someId')).scroll(100, 'down');
      await e.element(e.by.id('someId')).scroll(100, 'up');
      await e.element(e.by.id('someId')).scroll(100, 'right');
      await e.element(e.by.id('someId')).scroll(100, 'left');
      await e.element(e.by.id('someId')).scrollTo('bottom');
      await e.element(e.by.id('someId')).scrollTo('top');
      await e.element(e.by.id('someId')).scrollTo('left');
      await e.element(e.by.id('someId')).scrollTo('right');
      await e.element(e.by.id('someId')).swipe('down');
      await e.element(e.by.id('someId')).swipe('down', 'fast');
      await e.element(e.by.id('someId')).swipe('up', 'slow');
      await e.element(e.by.id('someId')).swipe('left', 'fast');
      await e.element(e.by.id('someId')).swipe('right', 'slow');
      await e.element(e.by.id('someId')).swipe('down', 'fast', 0.9);
      await e.element(e.by.id('someId')).swipe('up', 'slow', 0.9);
      await e.element(e.by.id('someId')).swipe('left', 'fast', 0.9);
      await e.element(e.by.id('someId')).swipe('right', 'slow', 0.9);
      await e.element(e.by.id('someId')).atIndex(1).tap();
      await e.element(e.by.id('someId')).setDatePickerDate('2019-2-8T05:10:00-08:00', 'yyyy-MM-dd\'T\'HH:mm:ssZZZZZ');
    });

    it(`interactions with wrong parameters should throw`, async () => {
      await expectToThrow(() => e.element(e.by.id('someId')).multiTap('NaN'));
      await expectToThrow(() => e.element(e.by.id('someId')).typeText(0));
      await expectToThrow(() => e.element(e.by.id('someId')).replaceText(3));
      await expectToThrow(() => e.element(e.by.id('someId')).pinchWithAngle('noDirection', 'slow', 0));
      await expectToThrow(() => e.element(e.by.id('someId')).pinchWithAngle(1, 'slow', 0));
      await expectToThrow(() => e.element(e.by.id('someId')).pinchWithAngle('outward', 1, 0));
      await expectToThrow(() => e.element(e.by.id('someId')).pinchWithAngle('outward', 'noDirection', 0));
      await expectToThrow(() => e.element(e.by.id('someId')).pinchWithAngle('outward', 'slow', 'NaN'));
      await expectToThrow(() => e.element(e.by.id('someId')).replaceText(3));
      await expectToThrow(() => e.element(e.by.id('someId')).scroll('NaN', 'down'));
      await expectToThrow(() => e.element(e.by.id('someId')).scroll(100, 'noDirection'));
      await expectToThrow(() => e.element(e.by.id('someId')).scroll(100, 'down', 0, 's'));
      await expectToThrow(() => e.element(e.by.id('someId')).scroll(100, 'down', 's', 's'));
      await expectToThrow(() => e.element(e.by.id('someId')).scroll(100, 0));
      await expectToThrow(() => e.element(e.by.id('someId')).scrollTo(0));
      await expectToThrow(() => e.element(e.by.id('someId')).scrollTo('noDirection'));
      await expectToThrow(() => e.element(e.by.id('someId')).swipe(4, 'fast'));
      await expectToThrow(() => e.element(e.by.id('someId')).swipe('left', 'fast', 20));
      await expectToThrow(() => e.element(e.by.id('someId')).swipe('noDirection', 0));
      await expectToThrow(() => e.element(e.by.id('someId')).swipe('noDirection', 'fast'));
      await expectToThrow(() => e.element(e.by.id('someId')).swipe('down', 'NotFastNorSlow'));
      await expectToThrow(() => e.element(e.by.id('someId')).swipe('down', 'NotFastNorSlow', 0.9));
      await expectToThrow(() => e.element(e.by.id('someId')).atIndex('NaN'));
      await expectToThrow(() => e.element(e.by.id('UIPickerView')).setDatePickerDate(0, 'mm'));
      await expectToThrow(() => e.element(e.by.id('UIPickerView')).setDatePickerDate('mm', 0));
      await expectToThrow(() => e.element(e.by.id('UIPickerView')).setDatePickerDate(0, 0));
    });

  });

  describe('WaitFor', () => {
    it(`waitFor (element)`, async () => {
      await e.waitFor(e.element(e.by.id('id'))).toExist().withTimeout(0);
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible();
      await e.waitFor(e.element(e.by.id('id'))).toBeNotVisible();
      await e.waitFor(e.element(e.by.id('id'))).toExist();
      await e.waitFor(e.element(e.by.id('id'))).toExist().withTimeout(0);
      await e.waitFor(e.element(e.by.id('id'))).toNotExist().withTimeout(0);
      await e.waitFor(e.element(e.by.id('id'))).toHaveId('text');
      await e.waitFor(e.element(e.by.id('id'))).toHaveText('text');
      await e.waitFor(e.element(e.by.id('id'))).toHaveValue('value');
      await e.waitFor(e.element(e.by.id('id'))).toHaveLabel('value');
      await e.waitFor(e.element(e.by.id('id'))).toNotHaveValue('value');
    });

    it(`waitFor (element) with wrong parameters should throw`, async () => {
      await expectToThrow(() => e.waitFor('notAnElement'));
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toExist().withTimeout('notANumber'));
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toExist().withTimeout(-1));
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement('notAnElement'));
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).longPress('notANumber'));
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).multiTap('notANumber'));
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).tapAtPoint('notAPoint'));
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).tapAtPoint({ notx: 1, y: 3 }));
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).tapAtPoint({ x: 1, noty: 3 }));
      // await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).tapBackspaceKey());
      // await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).tapReturnKey());
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).typeText(2));
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).replaceText(2));
      // await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).clearText());
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).scroll(50, 'notADirection', 0, 0));
      await expectToThrow(() => e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).scrollTo('notADirection'));
    });

    it(`waitFor....whileElement() actions`, async () => {
      await e.waitFor(e.element(e.by.id('id'))).toExist().withTimeout(2000);
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).tap();
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).longPress();
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).multiTap(2);
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).tapAtPoint({ x: 1, y: 1 });
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).tapBackspaceKey();
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).tapReturnKey();
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).typeText('text');
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).replaceText('text');
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).clearText();
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).scroll(50);
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).scroll(50, 'down');
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).scroll(50, 'down', 0, 0);
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).scrollTo('left');
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).swipe('left');
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).swipe('left', 'fast');
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).swipe('left', 'slow', 0.1);
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).setColumnToValue(1, 'value');
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).setDatePickerDate('2019-2-8T05:10:00-08:00', 'yyyy-MM-dd\'T\'HH:mm:ssZZZZZ');
      await e.waitFor(e.element(e.by.id('id'))).toBeVisible().whileElement(e.by.id('id2')).pinchWithAngle('outward', 'fast', 0);
    });

    it(`waitFor (element) with non-elements should throw`, async () => {
      await expectToThrow(() => e.waitFor('notAnElement').toBeVisible());
    });

  });


});

async function expectToThrow(func) {
  try {
    await func();
    fail('should throw');
  } catch (ex) {
    expect(ex).toBeDefined();
  }
}

class MockExecutor {
  async execute(invocation) {
    return invocation;
  }
}