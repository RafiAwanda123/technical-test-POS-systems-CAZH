class ResponseFormatter {
  // Method untuk response sukses
  static success(data, message = 'Berhasil', statusCode = 200) {
    return {
      success: true,
      status: statusCode,
      message,
      data
    };
  }

  // Method untuk response error
  static error(message = 'Terjadi kesalahan', statusCode = 500, errors = null) {
    const response = {
      success: false,
      status: statusCode,
      message
    };
    
    // Tambahkan detail errors jika ada
    if (errors) {
      response.errors = errors;
    }
    
    return response;
  }

  // Method untuk response data dengan pagination
  static paginated(data, pagination, message = 'Berhasil') {
    return {
      success: true,
      status: 200,
      message,
      data,
      pagination
    };
  }
}

module.exports = ResponseFormatter;