import axios from "axios";
import create from 'zustand';

interface State {
    getList: (action: string) => any;
    getObject: (action: string, id: number) => any;
    newObject: (action: string, obj: any) => any;
    updateObject: (action: string, obj: any) => any;
    deleteObject: (action: string, id: number) => any;
  };
export const useStore = create<State>((set) => ({
    getList: async (action: string) => {
      let response;
      await axios.get(action)
        .then((res) => {
          response = res;
        })
        .catch((err) => {
          throw err;
        });
      if (response) {
        return response;
      }
    },
    getObject: async (action: string, id: number) => {
      let response;
      await axios
        .get(action + id)
        .then((res) => {
          response = res;
        })
        .catch((err) => {
          throw err;
        });
      if (response) {
        return response;
      }
    },
    newObject: async (action: string, obj: any) => {
      let response;
      await axios.post(action, obj)
        .then((res) => {
          response = res;
        })
        .catch((err) => {
          throw err;
        });
      if (response) {
        return response;
      }
    },
    updateObject: async (action: string, obj: any) => {
      let response;
      await axios
        .put(action, obj)
        .then((res) => {
          response = res;
        })
        .catch((err) => {
          throw err;
        });
      if (response) {
        return response;
      }
    },
    deleteObject: async (action: string, id: number) => {
      let response;
      await axios
        .delete(action + id)
        .then((res) => {
          response = res;
        })
        .catch((err) => {
          throw err;
        });
      if (response) {
        return response;
      }
    },
  }));
  