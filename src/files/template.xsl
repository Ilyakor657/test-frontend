<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
    <body>
      <xsl:for-each select="report">
        <div style="font-size: 18px;">
          <xsl:for-each select="chief">
            <span style="display: inline-block; margin-bottom: 10px;">
              ФИО:&#160;
              <xsl:value-of select="surnameLegal"/>&#160;
              <xsl:value-of select="nameLegal"/>&#160;
              <xsl:value-of select="patronymicLegal"/>
            </span><br></br>
            <span style="display: inline-block; margin-bottom: 10px;">ИНН:&#160;<xsl:value-of select="innLegal"/></span><br></br>
          </xsl:for-each>
          <xsl:for-each select="org">
            <span style="display: inline-block; margin-bottom: 10px;">Название организации:&#160;<xsl:value-of select="nameOrg"/></span><br></br>
            <span style="display: inline-block; margin-bottom: 10px;">ОГРН:&#160;<xsl:value-of select="ogrn"/></span><br></br>
            <span style="display: inline-block; margin-bottom: 10px;">ИНН:&#160;<xsl:value-of select="innOrg"/></span><br></br>
            <span style="display: inline-block; margin-bottom: 10px;">КПП:&#160;<xsl:value-of select="kpp"/></span><br></br>
            <xsl:for-each select="address">
              <span style="display: inline-block; margin-bottom: 10px;">
                Адрес:<br></br>
                <xsl:value-of select="region"/>,&#160;
                г.&#160;<xsl:value-of select="city"/>,&#160;
                ул.&#160;<xsl:value-of select="street"/>&#160;
                <xsl:value-of select="house"/>&#160;
              </span><br></br>
            </xsl:for-each>
          </xsl:for-each>
        </div>
        <div style="font-size: 18px;">
          <xsl:for-each select="client">
            <span style="display: inline-block; margin-bottom: 10px;">
              ФИО:&#160;
              <xsl:value-of select="surnameIndividual"/>&#160;
              <xsl:value-of select="nameIndividual"/>&#160;
              <xsl:value-of select="patronymicIndividual"/>
            </span><br></br>
            <span style="display: inline-block; margin-bottom: 10px;">Дата рождения:&#160;<xsl:value-of select="dateBirth"/></span><br></br> 
            <span style="display: inline-block; margin-bottom: 10px;">ИНН:&#160;<xsl:value-of select="innIndividual"/></span><br></br>
            <xsl:for-each select="passport">
              <span style="display: inline-block; margin-bottom: 10px;">Cерия:&#160;<xsl:value-of select="serial"/></span><br></br>
              <span style="display: inline-block; margin-bottom: 10px;">Номер:&#160;<xsl:value-of select="number"/></span><br></br>
              <span style="display: inline-block; margin-bottom: 10px;">Дата выдачи:&#160;<xsl:value-of select="dateIssue"/></span><br></br>
            </xsl:for-each>
          </xsl:for-each>
        </div> 
        <h2>График платежей:</h2>
        <table style="width:700px; border-collapse: collapse;" border="1">
          <tr style="height: 35px; text-align: center;">
            <th>№ платежа</th>
            <th>Дата платежа</th>
            <th>Сумма платежа</th>
            <th>Проценты</th>
            <th>Основной долг</th>
          </tr>
          <xsl:for-each select="table/payment">
            <tr style="height: 35px; text-align: center;">
              <td><xsl:value-of select="number"/></td>
              <td><xsl:value-of select="date"/></td>
              <td><xsl:value-of select="amountPayment"/></td>
              <td><xsl:value-of select="percent"/></td>
              <td><xsl:value-of select="debt"/></td>
            </tr>
          </xsl:for-each>
        </table>
      </xsl:for-each>
    </body>
  </html>
</xsl:template>
</xsl:stylesheet>