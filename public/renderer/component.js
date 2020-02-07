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

import React, { useState } from 'react';
import { EuiComboBox } from '@elastic/eui';

export const MultiFilter = ({ datatable, columns, selected = [], onChange }) => {
  const toOption = value => ({
    label: value.column + ':' + value.value,
    value,
  });

  const [selectedOptions, setSelectedOptions] = useState(selected.map(toOption));

  // Create a collection of groupings of options
  const groupings = columns.reduce((acc, column) => {
    const objs = datatable.rows.map(row => ({ column, value: row[column] }));
    acc[column] = Array.from(new Set(objs.map(item => item.value))).map(value =>
      objs.find(item => item.value === value)
    );
    return acc;
  }, {});

  // Create the appropriately-shaped choices for the drop down.
  const options = Object.keys(groupings).map(group => ({
    label: group,
    options: groupings[group].map(item => toOption({ column: group, value: item.value })),
  }));

  const onChangeHandler = items => {
    setSelectedOptions(items);
  };

  return (
    <div className="">
      <EuiComboBox
        placeholder="Select filters..."
        options={options}
        selectedOptions={selectedOptions}
        onChange={onChangeHandler}
        onBlur={() => {
          onChange(selectedOptions.map(option => option.value));
        }}
        fullWidth
        compressed
      />
    </div>
  );
};
