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

import { multiFilter as multiFilterRenderer } from './renderer';
import { multiFilter as multiFilterElement } from './element';
import { multiFilterControl as multiFitlerControlFn } from './function';
import { multiFilterControl as multiFitlerControlView } from './view';

const elements = [multiFilterElement];

const browserFunctions = [multiFitlerControlFn];

const views = [multiFitlerControlView];

const renderers = [multiFilterRenderer];

// Register our elements and browserFunctions with the Canvas interpreter.
kbnInterpreter.register({
  elements,
  browserFunctions,
  views,
  renderers,
});
