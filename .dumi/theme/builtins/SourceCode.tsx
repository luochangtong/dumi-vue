/* eslint-disabled */
// @ts-nocheck
// @ts-ignore
import React from 'react';
import type { Language } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { useCopy } from 'dumi/theme';
import 'prismjs/themes/prism.css';
import 'dumi-theme-default/es/builtins/SourceCode.less';

export interface ICodeBlockProps {
  code: string;
  lang: Language;
  showCopy?: boolean;
}

export default ({ code, lang, showCopy = true }: ICodeBlockProps) => {
  const [copyCode, copyStatus] = useCopy();

  console.log('lang', lang, 'code', code);

  return (
    <div className="__dumi-default-code-block">
      <Highlight
        {...defaultProps}
        code={code}
        language={lang === 'vue' ? 'js' : lang}
        theme={undefined}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {showCopy && (
              <button
                className="__dumi-default-icon __dumi-default-code-block-copy-btn"
                data-status={copyStatus}
                onClick={() => copyCode(code)}
              />
            )}
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
