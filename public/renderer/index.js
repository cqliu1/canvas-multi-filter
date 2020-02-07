/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { fromExpression, toExpression } from '@kbn/interpreter/common';
import { get } from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import { MultiFilter } from './component';

const getFilterValues = filterExpression => {
  if (filterExpression === '') {
    return [];
  }

  const filterAST = fromExpression(filterExpression);
  return filterAST.chain.map(chain => ({
    value: get(chain, 'arguments.value[0]'),
    column: get(chain, 'arguments.column[0]'),
  }));
};

export const multiFilter = () => ({
  name: 'multi_filter',
  displayName: 'Multiple filter',
  help: 'Renders a multiple selection dropdown filter',
  reuseDomNode: true,
  height: 50,
  render(domNode, config, handlers) {
    const filterExpression = handlers.getFilter();

    const onChange = options => {
      if (options.length === 0) {
        handlers.setFilter('');
      } else {
        const filterChain = options.map(({ column, value }) => {
          return {
            type: 'function',
            function: 'exactly',
            arguments: {
              value: [value],
              column: [column],
              filterGroup: [config.filterGroup],
            },
          };
        });

        const newFilterAST = {
          type: 'expression',
          chain: filterChain,
        };

        const newFilter = toExpression(newFilterAST);
        handlers.setFilter(newFilter);
      }
    };

    const { datatable, columns } = config;
    const selected = getFilterValues(filterExpression);

    ReactDOM.render(<MultiFilter {...{ onChange, datatable, columns, selected }} />, domNode, () =>
      handlers.done()
    );

    handlers.onDestroy(() => {
      ReactDOM.unmountComponentAtNode(domNode);
    });
  },
});
