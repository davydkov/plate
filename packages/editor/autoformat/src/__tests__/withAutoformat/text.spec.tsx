/** @jsx jsx */

import { mockPlugin } from '@udecode/plate-core';
import { jsx } from '@udecode/plate-test-utils';
import { withReact } from 'slate-react';
import { CONFIG } from '../../../../../../examples/src/config/config';
import { withAutoformat } from '../../withAutoformat';

jsx;

describe('when --space', () => {
  it('should insert —', () => {
    const input = (
      <editor>
        <hp>
          -
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>
          —
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const editor = withAutoformat(
      withReact(input),
      mockPlugin(CONFIG.autoformat as any)
    );

    editor.insertText('-');

    expect(input.children).toEqual(output.children);
  });
});

describe('when (tm)', () => {
  it('should insert &trade;', () => {
    const input = (
      <editor>
        <hp>
          (tm
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>
          ™
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const editor = withAutoformat(
      withReact(input),
      mockPlugin(CONFIG.autoformat as any)
    );

    editor.insertText(')');

    expect(input.children).toEqual(output.children);
  });
});

describe('when &sect', () => {
  it('should insert §', () => {
    const input = (
      <editor>
        <hp>
          &sect
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>
          §
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const editor = withAutoformat(
      withReact(input),
      mockPlugin(CONFIG.autoformat as any)
    );

    editor.insertText(';');

    expect(input.children).toEqual(output.children);
  });
});

describe('when //', () => {
  it('should insert ÷', () => {
    const input = (
      <editor>
        <hp>
          /
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>
          ÷
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const editor = withAutoformat(
      withReact(input),
      mockPlugin(CONFIG.autoformat as any)
    );

    editor.insertText('/');

    expect(input.children).toEqual(output.children);
  });
});

describe('when typing %%%', () => {
  it('should autoformat', () => {
    const input = (
      <editor>
        <hp>
          %
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const output1 = (
      <editor>
        <hp>
          ‰
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const output2 = (
      <editor>
        <hp>
          ‱
          <cursor />
          hello
        </hp>
      </editor>
    ) as any;

    const editor = withAutoformat(
      withReact(input),
      mockPlugin(CONFIG.autoformat as any)
    );

    editor.insertText('%');

    expect(input.children).toEqual(output1.children);

    editor.insertText('%');

    expect(input.children).toEqual(output2.children);
  });
});

describe('when using quotes', () => {
  it('should autoformat to smart quotes', () => {
    const input = (
      <editor>
        <hp>
          "hello
          <cursor /> .
        </hp>
      </editor>
    ) as any;

    const output = (
      <editor>
        <hp>“hello” .</hp>
      </editor>
    ) as any;

    const editor = withAutoformat(
      withReact(input),
      mockPlugin({
        options: {
          rules: [
            {
              mode: 'text',
              match: '"',
              format: ['“', '”'],
            },
          ],
        },
      })
    );

    editor.insertText('"');

    expect(input.children).toEqual(output.children);
  });
});
