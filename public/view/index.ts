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

export const multifilterControl = () => ({
  name: 'multifilterControl',
  displayName: 'Multiple filters',
  modelArgs: [],
  args: [
    {
      name: 'columns',
      displayName: 'Column name',
      help: 'Select the column from which values will be displayed as filters.',
      argType: 'string',
      multi: true,
      options: {
        confirm: 'Set',
      },
    },
    {
      name: 'filterGroup',
      displayName: 'Filter group',
      help: "Apply the selected group name to an element's filters function to target this filter",
      argType: 'filterGroup',
    },
  ],
});
