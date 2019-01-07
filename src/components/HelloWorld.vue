<template>
 <div>
      <!-- bidirectional data binding（双向数据绑定） -->
  <codemirror v-model="code" :options="cmOptions"></codemirror>

  <!-- or to manually control the datasynchronization（或者手动控制数据流，需要像这样手动监听changed事件） -->
 </div>


</template>

<script>
 // language
  import 'codemirror/mode/sql/sql.js'
// theme css
import 'codemirror/theme/solarized.css'
// more codemirror resources
// import 'codemirror/some-resource...'
export default {
  data () {
    return {
      code: `
-- SQL Mode for CodeMirror
SELECT SQL_NO_CACHE DISTINCT
    @var1 AS \`val1\`, @'val2', @global.'sql_mode',
    1.1 AS \`float_val\`, .14 AS \`another_float\`, 0.09e3 AS \`int_with_esp\`,
    0xFA5 AS \`hex\`, x'fa5' AS \`hex2\`, 0b101 AS \`bin\`, b'101' AS \`bin2\`,
    DATE '1994-01-01' AS \`sql_date\`, { T "1994-01-01" } AS \`odbc_date\`,
    'my string', _utf8'your string', N'her string',
        TRUE, FALSE, UNKNOWN
  FROM DUAL
  -- space needed after '--'
  # 1 line comment
  /* multiline
  comment! */
  LIMIT 1 OFFSET 0;
`,
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/x-mysql',
        theme: 'solarized',
        lineNumbers: true,
        line: true,
        // more codemirror options, 更多 codemirror 的高级配置...
      }
    }
  },
  methods: {
   
  },
  computed: {
   
  },
  mounted() {
    console.log('this is current codemirror object', this.codemirror)
    // you can use this.codemirror to do something...
  }
}
</script>