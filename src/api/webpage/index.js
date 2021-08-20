import { EVENT, METHOD, SENDER, TARGET } from '../../config/config';
import { Messaging } from '../messaging';

export const getBalance = async () => {
  const result = await Messaging.sendToContent({ method: METHOD.getBalance });
  return result.data;
};

export const enable = async () => {
  const result = await Messaging.sendToContent({ method: METHOD.enable });
  return result.data;
};

export const isEnabled = async () => {
  const result = await Messaging.sendToContent({ method: METHOD.isEnabled });
  return result.data;
};

export const signData = async (address, payload) => {
  const result = await Messaging.sendToContent({
    method: METHOD.signData,
    data: { address, payload },
  });
  return result.data;
};

export const signTx = async (tx, partialSign = false) => {
  const result = await Messaging.sendToContent({
    method: METHOD.signTx,
    data: { tx, partialSign },
  });
  return result.data;
};

export const getAddress = async () => {
  const result = await Messaging.sendToContent({
    method: METHOD.getAddress,
  });
  return result.data;
};

export const getRewardAddress = async () => {
  const result = await Messaging.sendToContent({
    method: METHOD.getRewardAddress,
  });
  return result.data;
};

export const getNetworkId = async () => {
  const result = await Messaging.sendToContent({
    method: METHOD.getNetworkId,
  });
  return result.data;
};

export const getUtxos = async (amount = undefined, paginate = undefined) => {
  const result = await Messaging.sendToContent({
    method: METHOD.getUtxos,
    data: { amount, paginate },
  });
  return result.data;
};

export const submitTx = async (tx) => {
  const result = await Messaging.sendToContent({
    method: METHOD.submitTx,
    data: tx,
  });
  return result.data;
};

export const onAccountChange = (callback) => {
  function responseHandler(e) {
    const response = e.data;
    if (
      typeof response !== 'object' ||
      response === null ||
      !response.target ||
      response.target !== TARGET ||
      !response.event ||
      response.event !== EVENT.accountChange ||
      !response.sender ||
      response.sender !== SENDER.extension
    )
      return;
    callback(response.data);
  }
  window.addEventListener('message', responseHandler);
  return {
    remove: () => {
      window.removeEventListener('message', responseHandler);
    },
  };
};

export const onNetworkChange = (callback) => {
  function responseHandler(e) {
    const response = e.data;
    if (
      typeof response !== 'object' ||
      response === null ||
      !response.target ||
      response.target !== TARGET ||
      !response.event ||
      response.event !== EVENT.networkChange ||
      !response.sender ||
      response.sender !== SENDER.extension
    )
      return;
    callback(response.data);
  }
  window.addEventListener('message', responseHandler);
  return {
    remove: () => {
      window.removeEventListener('message', responseHandler);
    },
  };
};
