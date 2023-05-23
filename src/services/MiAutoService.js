class MiAutoService {
  async fetchUrl() {
    const getUrl =
      'https://local.humano.test/integrations/integrations/GetBaseUrl';

    // let str = window.location.href;
    // let dynamo = str.substring(0, str.length - 6);
    // const getUrl = `${dynamo}integrations/integrations/GetBaseUrl`;

    try {
      const response = await fetch(getUrl);
      const data = await response.json();
      console.log('url dynamica fetch: ', data);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async fetchMarcas(url) {
    const urlMarcas = `${url}integrations/integrations/marcasVehiculo`;
    try {
      const response = await fetch(urlMarcas);
      const data = await response.json();
      console.log('data marcas fetch: ', data);
      return data;
    } catch (error) {
      console.log('data marcas URL: ', url);
      console.log('data marcas ERROR: ', error);
    }
  }

  async fetchAnios(url) {
    const urlAnios = `${url}integrations/integrations/AniosVehiculo`;
    try {
      const response = await fetch(urlAnios);
      const data = await response.json();
      var result = data.anios.map((item) => item.anio);
      return result.sort().reverse();
    } catch (error) {
      console.log('data anios ERROR: ', error);
    }
  }

  async fetchCasaCarcel(url) {
    const urlCasaCarcel = `${url}integrations/integrations/ObtenerServicioCasaCarcel`;
    try {
      const response = await fetch(urlCasaCarcel);
      const data = await response.json();
      console.log('data CasaCarcel', data);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async fetchFianza(url) {
    const urlFianza = `${url}integrations/integrations/ConsultarListaValores?pCdTabla=250026&pVaDato1=1&pVaDato2=1`;
    try {
      const response = await fetch(urlFianza);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async fetchZona(url) {
    const urlZona = `${url}integrations/integrations/ConsultarListaValores?pCdTabla=250323`;
    try {
      const response = await fetch(urlZona);
      const data = await response.json();
      console.log('zonas = ', data);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async fetchRentado(url) {
    const urlRentado = `${url}integrations/integrations/ConsultarListaValores?pCdTabla=250028`;
    try {
      const response = await fetch(urlRentado);
      const data = await response.json();
      console.log('rentado = ', data);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async fetchAccidentes(url) {
    const urlAcc = `${url}integrations/integrations/ConsultarListaValores?pCdTabla=250024&pVaDato1=1&pVaDato2=1`;
    try {
      const response = await fetch(urlAcc);
      const data = await response.json();
      console.log('accidentes = ', data);
      return data;
    } catch (error) {
      console.log('error', error);
    }
  }

  async fetchCoberturas (url, plan){
    const urlCoberturas = `${url}integrations/integrations/CoberturasporProductos?plan=${plan}&producto=350100`;
    try {
      const response = await fetch(urlCoberturas);
      const data = await response.json();
      return data.payload;
    } catch (error) {
      console.log('error', error);
    }
  }

  async fetchModelos(url, optionsUser) {
    const urlModelos = `${url}integrations/integrations/modelosVehiculo?idMarca=${optionsUser.idMarca}`;
    try {
      const response = await fetch(urlModelos);
      const data = await response.json();
      return data.modelos;
    } catch (error) {
      console.log('error', error);
    }
  }

  async fetchVersiones(url, optionsUser) {
    const urlVersiones = `${url}integrations/integrations/obtenerVersion?idMarca=${optionsUser.idMarca}&idModelo=${optionsUser.idModelo}`;
    try {
      const response = await fetch(urlVersiones);
      const data = await response.json();
      return data.tablaInformacionCond;
    } catch (error) {
      console.log('error', error);
    }
  }

  // Add Options Selected
  async prepararCotizacion(url, dataCotizacion) {
    const urlPrepararCoti = `${url}integrations/integrations/PrepararCotizacion`;
    const formData = new FormData();
    formData.append('json', JSON.stringify(dataCotizacion));

    try {
      const res = await fetch(urlPrepararCoti, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      console.log('data ', data);
      return data;
    } catch (error) {
      console.log('error cotizar = ', error);
    }
  }

  async cotizar(url, dataCotizacion) {
    const urlCotizar = `${url}integrations/integrations/Cotizar`;
    const formData = new FormData();
    formData.append('json', JSON.stringify(dataCotizacion));

    const formDataEntries = formData.entries();
    for (let pair of formDataEntries) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await fetch(urlCotizar, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.log('error cotizar = ', error);
    }
  }
}

export default new MiAutoService();