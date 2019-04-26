import React from 'react';
import { FieldArray } from 'redux-form';

import Worker from './Worker';
import Dropzone from '../../../../../components/common/Dropzone';
import Row from '../../../../../components/Grid/Row';
import Col from '../../../../../components/Grid/Col';
import TextField from '../../../../../components/common/TextField';
import Select from '../../../../../components/common/Select';
import { Button } from '../../../../../components/general/Button';
import MultipleSourceWithLink from '../../../../../components/common/FormComponents/MultipleSourceWithLink';
import MultipleEmails from '../../../../../components/common/FormComponents/MultipleEmails';

const Workers = ({ fields }) => (
    fields.map((worker, index) => {
      const workerInfo = fields.get(index);

      return (
        <div>
          {index !== 0 && <hr />}
          <Worker workerInfo={workerInfo} worker={worker} index={index} />
        </div>
      );
    })
);

export default Workers;
